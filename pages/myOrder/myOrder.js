// pages/order/order.js
//获取应用实例
import {
  baseUrl
} from '../common/url.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    current: 0,
    swipertab: [{
      name: '全部',
      index: 0
    }, {
      name: '待付款',
      index: 1
    }, {
      name: '待审核',
      index: 2
    }],
    page: 1,
    pageSize: 10,
    totalPage: 0,
    globalDate: '',
    list: [],
    check: null,
    pay: null,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 获取所有的订单信息
  myOrderList(status) {
    console.log(this.data.globalDate)
    let _this = this;
    wx.request({
      url: baseUrl + 'booking/listByUser',
      data: {
        openID: this.data.globalDate,
        status: status
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        // console.log(res.data.data.waitForCheck)
        _this.setData({
          list: res.data.data.list.list,
          check: res.data.data.waitForCheck,
          pay: res.data.data.waitForPay,
          totalPage: res.data.data.list.count

        })
      }
    })
  },
  // 触底加载更多
  onLower(e) {
    let _this = this;
    let status = e.currentTarget.dataset.status
    if (status == 'null') {
      console.log(_this.data.totalPage)
      if (_this.data.page < Math.ceil(_this.data.totalPage / _this.data.pageSize)) {
        _this.setData({
          page: _this.data.page + 1
        })
        wx.showLoading({
          title: '加载中......',
        })
        wx.request({
          url: baseUrl + 'booking/listByUser',
          data: {
            page: _this.data.page,
            pageSize: _this.data.pageSize,
            openID: _this.data.globalDate,
            status: status
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            wx.hideLoading()
            // console.log(res.data)
            _this.setData({
              list: _this.data.list.concat(res.data.data.list.list)

            })
            console.log(_this.data.list)
          }
        })
      }
    } else if (status == '0') {
      _this.setData({
        totalPage: _this.data.pay.count
      })
      // console.log(_this.data.pay.count)
      // console.log(_this.data.totalPage)
      console.log()
      if (_this.data.page < Math.ceil(_this.data.totalPage / _this.data.pageSize)) {
        _this.setData({
          page: _this.data.page + 1
        })
        wx.showLoading({
          title: '加载中......',
        })
        wx.request({
          url: baseUrl + 'booking/listByUser',
          data: {
            page: _this.data.page,
            pageSize: _this.data.pageSize,
            openID: _this.data.globalDate,
            status: status
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            wx.hideLoading()
            // console.log(res.data)
            // console.log(_this.data.pay)
            // console.log(res.data.data.waitForCheck)
            res.data.data.waitForPay.list = _this.data.pay.list.concat(res.data.data.waitForPay.list),
              _this.setData({
                pay: res.data.data.waitForPay
              })
            console.log(_this.data.pay)
          }
        })
      }
    } else if (status == '1') {
      _this.setData({
        totalPage: _this.data.check.count
      })
      console.log(_this.data.totalPage)
      if (_this.data.page < Math.ceil(_this.data.totalPage / _this.data.pageSize)) {
        _this.setData({
          page: _this.data.page + 1
        })
        wx.showLoading({
          title: '加载中......',
        })
        wx.request({
          url: baseUrl + 'booking/listByUser',
          data: {
            page: _this.data.page,
            pageSize: _this.data.pageSize,
            openID: _this.data.globalDate,
            status: status
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            wx.hideLoading()
            // console.log(res.data)
            // console.log(res.data.data.waitForCheck)
            res.data.data.waitForCheck.list = _this.data.check.list.concat(res.data.data.waitForCheck.list),
              _this.setData({
                pay: res.data.data.waitForCheck
              })
          }
        })
      }
    }

  },
  // 查看订单详情
  orderList(e) {
    console.log(e)
    let data = {
      flag: 1,
      bookid: e.currentTarget.dataset.bookid
    }
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?data=' + JSON.stringify(data),
    })
  },
  // 付款
  goBuy(e) {
    console.log(e)
    let data = e.currentTarget.dataset.list
    console.log(data)
    let payInfo = {
      amount: data.all_fee,
      openID: this.data.globalDate,
      mediaName: data.name,
      bookingCode: data.booking_code,
      bookingID: data.booking_id
    }
    console.log(121312, payInfo)
    wx.navigateTo({
      url: '/pages/buy/buy?info=' + JSON.stringify(payInfo),
    })
  },
  // 取消订单
  cancel(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.list.booking_id)
    wx.request({
      url: baseUrl + 'booking/cancelPay',
      method: 'POST',
      dataType: 'JSON',
      header: {
        'content-type': 'application/json'
      },
      data: {
        bookingID: e.currentTarget.dataset.list.booking_id,
        status: -1
      },
      success: res => {
        console.log(res)
        this.myOrderList(null)
      }
    })
  },
  onLoad: function(options) {
    console.log(options,'===')
    this.setData({
      globalDate: app.globalData.openID
    })
    this.myOrderList(null)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 页面渲染完成
  },
  //查看状态
  goStatus(e) {
    console.log(e)
    let info = {
      status: e.currentTarget.dataset.list.status,
      date: e.currentTarget.dataset.list.updated_on,
      name: e.currentTarget.dataset.list.name
    }
    wx.navigateTo({
      url: '/pages/orderStatus/orderStatus?data=' + JSON.stringify(info)
    })
  },

  /**
   * @Explain：选项卡点击切换
   */
  tabSwitch: function(e) {
    console.log(e)
    var that = this
    if (this.data.current === e.target.dataset.number) {
      return false
    } else {
      that.setData({
        page: 1,
        current: e.target.dataset.number
      })
    }
    // this.myOrderList(e.target.dataset.current)
  },
  //左右滑动
  tabChange: function(e) {
    console.log(e)
    this.setData({
      page: 1,
      current: e.detail.current
    })
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
    // wx.reLaunch({
    //   url: '../my/my'
    // })

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