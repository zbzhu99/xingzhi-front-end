//app.js
App({
  onLaunch: function() {
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code
        var that = this
        if (code) {
          that.globalData.code = code
          globalData: {
            code: code
          }
          wx.request({
            url: that.globalData.URL + '/user/login/',
            // url: 'http://127.0.0.1:8000/user/login/',
            method: 'POST',
            data: { code: res.code },
            success: function (res) {
              that.globalData.openid = res.data.openid
              that.globalData.is_filled = res.data.is_filled
              console.log(that.globalData.openid)
              wx.setStorage({
                key: 'userData',
                data: {
                  name: res.data.name,
                  phone_num: res.data.phone_num,
                  department: res.data.department,
                  student_id: res.data.student_id,
                  email: res.data.email
                }
              })
              console.log(res.data.is_filled)
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
         	this.globalData.Custom = capsule;
        	this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
        	this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: null,
    is_filled: 0,
    URL: 'https://scuxingzhi.top:8080',
    // URL: 'http://127.0.0.1:8000',
  }
})