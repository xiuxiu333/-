// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[
      { name: '隐私协议', img:'/images/my-icon.png'},
      { name: '风险提醒', img: '/images/my-icon.png' },
      { name: '免责声明', img: '/images/my-icon.png' },
      { name: '服务协议', img: '/images/my-icon.png' }
    ]

  },
  goHelp(e){
    wx.navigateTo({
      url: '/pages/help/help?index='+e.currentTarget.dataset.index+'&title='+e.currentTarget.dataset.title,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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