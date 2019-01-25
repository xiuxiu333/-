// pages/orderStatus/orderStatus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    status:null,
    start:true,
    date:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let datas = JSON.parse(options.data)
console.log(datas)
    let data = datas.date.replace(/-/g,'/').replace(/T/g,' ').slice(0,datas.date.indexOf('.'))
    console.log(data)
    let newDate = new Date(data)
    let month=newDate.getMonth()+1
    let day=newDate.getDate()
    let hour = newDate.getHours()
    let min=newDate.getMinutes()
    console.log(month, day, hour, min)
    hour<10?hour=`0${hour}`:hour=hour
    min<10?min=`0${min}`:min=min
    let lastDate=`${month}月${day}日 ${hour}:${min}`
    console.log(lastDate)
    wx.setNavigationBarTitle({
      title: datas.name,
    })
    this.setData({
      status: datas.status,
      date: lastDate
    })
    console.log(this.data.status)
    console.log(this.data.date)
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