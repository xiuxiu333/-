// pages/buy/buy.js
import {
  baseUrl
} from '../common/url.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      list: JSON.parse(options.info),
      openid: app.globalData.openID
    })
    console.log(this.data.list)
  },
  goBuy() {
    let payInfo={
      amount:this.data.list.amount,
      openID:this.data.openid,
      mediaName: this.data.list.mediaName,
      bookingCode: this.data.list.bookingCode,
      bookingID:this.data.list.bookingID
    }
    console.log(121312, payInfo)
    wx.request({
      url: baseUrl+'booking/createUnifiedOrder',
      method:'POST',
      dataType:'JSON',
      header:{
        'content-type': 'application/x-www-form-urlencoded' 
      },
      data: payInfo,
      success:res=>{
        console.log(res)
        let result=JSON.parse(res.data)
        console.log(result)
        if (result.data.prepayId!=''){
          console.log('微信统一下单接口调用成功 数据包：' + result.data.prepayId);
          console.log('微信统一下单接口调用成功 订单号：' + result.data.outTradeNo);
          console.log('调用微信支付接口之前先生成签名')
          let outTradeNo = result.data.outTradeNo;
          wx.request({
            url: baseUrl+'booking/generateSignature',
            method:'POST',
            dataType:'JSON',
            header:{
              'content-type': 'application/x-www-form-urlencoded'
            },
            data:{
              prepayId: result.data.prepayId
            },
            success:res=>{
              console.log(res,'222222')
              let result=JSON.parse(res.data)
              if (result.data.sign!=''){
                console.log('微信支付接口之前先生成签名成功')
                console.log('签名：' + result.data.sign)
                console.log('随机串：' + result.data.nonceStr)
                console.log('时间戳：' + result.data.timeStamp)
                //这个applyId一定要大写 而且签名的参数和调用方法的参数值一定要统一
                wx.requestPayment({
                  timeStamp: result.data.timeStamp,
                  nonceStr: result.data.nonceStr,
                  package: result.data.package,
                  signType: 'MD5',
                  paySign: result.data.sign,
                  success:function(paymentRes){
                    console.log(paymentRes,'========')
                    wx.reLaunch({
                      url: '/pages/myOrder/myOrder',
                    })
    
                  },
                  fail:err=>{
                    console.log(err)
                    console.log(this.data.list.bookingID)
                    wx.request({
                      url: baseUrl+'booking/cancelPay',
                      method:'POST',
                      dataType:'JSON',
                      header:{
                        'content-type':'application/json'
                      },
                      data:{
                        status:0,
                        bookingID: this.data.list.bookingID
                      },
                      success:res=>{
                        console.log(res)
                        wx.reLaunch({
                          url: '/pages/myOrder/myOrder',
                        })
                      }
                    })
                  }
                })
              }
            },
            fail:err=>{
              console.log(err)
            }
          })
        }
      },
      fail:err=>{
        console.log(err)
      }
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