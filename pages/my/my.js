// pages/my/my.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: '',
    userInfos: null,
    openids: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(123)
    // wx.getUserInfo({
    //   success:res=>{
    //     console.log(res)
    //     let result=res.userInfo
    //     let gender = ''
    //     if (result.gender == 0) {
    //       gender = '未知'
    //     } else if (result.gender == 1) {
    //       gender = '男'
    //     } else if (result.gender == 2) {
    //       gender = '女'
    //     }
    //     this.setData({
    //       gender: gender
    //     })
    //   }
    // })
    let gender = ''
    if (app.globalData.userInfo.gender == 0) {
      gender = '未知'
    } else if (app.globalData.userInfo.gender == 1) {
      gender = '男'
    } else if (app.globalData.userInfo.gender == 2) {
      gender = '女'
    }
    this.setData({
      gender: gender
    })
    console.log(app.globalData.userInfo)
    app.globalData.userInfo ? this.getuser(app.globalData.userInfo) : app.userInfoReadyCallback = this.getuser
    console.log(app.globalData.openID)
    app.globalData.openID ? this.getopenID(app.globalData.openID) : app.openIDCallback = this.getopenID
  },
  getuser(userInfo) {
    console.log(userInfo, '0000000')
  },
  getopenID(openid) {
    console.log(openid, '11111')

  },
  goMyOrder() {
    wx.navigateTo({
      url: '/pages/myOrder/myOrder',
    })
  },
  goInfoDetail(){
    wx.navigateTo({
      url: '/pages/info/info',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})