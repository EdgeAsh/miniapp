// regeneratorRuntime是ES6的编译环境，使小程序支持async、await、generator等
import regeneratorRuntime from 'regenerator-runtime'
global.regeneratorRuntime = regeneratorRuntime

import _ from 'lodash'  // 包含常用的工具方法
global._ = _

import R from 'ramda'  // 函数式编程需要的库
global.R = R

/*
* 打包下函数，让其支持最新的async,await
* 使wx上的方法支持async\await调用
* 将函数使用Promise封装
*/
const asyncWrap = fn => (options = {}) => new Promise((resolve, reject) => {
  let conf = {
    success: res => {
      resolve(res)
    },
    fail: err => {
      reject(err)
    }
  }

  wx[fn](R.merge(conf, options))
})

wx.loginAsync = asyncWrap('login')
wx.getUserInfoAsync = asyncWrap('getUserInfo')
wx.requestAsync = asyncWrap('request')
wx.getSystemInfoAsync = asyncWrap('getSystemInfo')
wx.paymentAsync = asyncWrap('requestPayment')

// 动画效果控制
let lastTime = 0
global.requestAnimationFrame = callback => {
  const currentTime = new Date().getTime()
  const timeToCall = Math.max(0, 16 - (currentTime + lastTime))
  const timer = global.setTimeout(function() {
    callback(currentTime + timeToCall)
  }, timeToCall)

  return timer
}

global.cancelAnimationFrame = timer => {
  clearTimeout(timer)
}

// 动画库
import TWEEN from 'tween.js'

TWEEN.now = function() {
  return new Date().getTime()
}

global.TWEEN = TWEEN