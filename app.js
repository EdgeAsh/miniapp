import './styles/base.sass'
import './vendor.js' // 封装一些三方库，挂载到wxd对象上

App({
  globalData: {
    userInfo: null
  },
  // lazy loading openid
  async getUserInfo() {
    if (this.globalData.userInfo) return this.globalData.userInfo
    console.log('获取用户信息')
    const { code } = await wx.loginAsync()
    const { userInfo } = await wx.getUserInfoAsync()
    console.log(code, '用户code')
    this.globalData.userInfo = userInfo
  }
})
