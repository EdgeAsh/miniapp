/*
* 这里就是webpack工作的步骤（自制的）
* 步骤
*   1，新建目标目录
*   2，生成webpack编译器
*   3，使用编译器监听文件变化，随时进行编译
*/
require('shelljs/global')  // 使用shell脚本命令

const {resolve} = require('path')
const fs = require('fs')
const webpack = require('webpack')
const _ = require('lodash')
const r = url => resolve(porcess.cwd(), url)
const config = require('../config')
const webpackConf = require('./webpack.conf')

const assetsPath = config.assetsPath

rm('-rf', assetsPath)
// 1，新建目录
mkdir(assetsPath)

const renderConf = webpackConf
// 拿到所有入口文件
const entry = () => _.reduce(config.json.pages, (en, i) => {
  en[i] = resolve(__dirname, '../', `${i}.mina`)

  return en
}, {})

renderConf.output = {
  path: config.assetsPath,
  filename: '[name].js'
}

renderConf.entry = entry()
// 
renderConf.entry.app = config.app

// 2，webpack编译器，传配置文件
const compiler = webpack(renderConf)

// 这是干啥？为什么要在这写
fs.writeFileSync(resolve(config.assetsPath, './app.json'), JSON.stringify(config.json), 'utf8')

// 3，监听文件变化
compiler.watch({}, (err, stats) => {
  if(err) process.stdout.write(err)
  console.log('[webpack:build]', stats.toString({chunks: false, colors: true}))
})