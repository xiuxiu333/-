// pages/special/special.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:['/images/activity1.jpg', '/images/activity2.jpg', '/images/activity3.jpg', '/images/activity4.jpg', '/images/activity5.jpg'],
    infos: ['/images/vm1.jpg', '/images/vm2.jpg', '/images/vm3.jpg', '/images/vm4.jpg'],
    current:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
console.log(options)
this.setData({
  current: options.index
})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})