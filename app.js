//app.js
import {
  baseUrl
} from '/pages/common/url.js'
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    wx.login({
      success: (res) => {
        // console.log(res)
        wx.request({
          url: baseUrl + 'booking/getOpenID?code=' + res.code,
          method: 'POST',
          dataType: 'JSON',
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            console.log(res, '=======')
            if (res.statusCode == 200) {
              let result = JSON.parse(res.data)
              if (result.code == 200) {
                this.globalData.openID = result.data.openid
                this.globalData.session_key = result.data.session_key
                if (this.openIDCallback) {
                  this.openIDCallback(res)
                }
              }
            }
            console.log(this.globalData.openID)
            // console.log(this.globalData.session_key)
          },
          fail: err => {
            console.log(err)
          }
        })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openID: null,
    session_key: null
  }
})