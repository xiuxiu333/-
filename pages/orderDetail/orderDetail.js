// pages/orderDetail/orderDetail.js
import {
  baseUrl
} from '../common/url.js'
const app = getApp()

var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderUpdate: [{
      zhichi: '支持.jpg   .png   .psd格式',
      tishi: '提示：',
      chicun: '尺寸要求 画质要求 内容规格。。。'
    }],
    orderBian: [{
      bianhao: '订单编号：12345678',
      xiadan: '下单时间：2019-10-12 20:20:16',
      zhifu: '支付方式：微信支付',
      tishiList: '提示：',
      fengxian: '风险提醒',
      shangkan: '上刊提醒',
      yinsi: '隐私权',
      modet: '合计：',
      money4: '￥3399'
    }],
    list: [],
    isShowDetail: false,
    thumbnail:true,
    pics: '',
    packageId: 1,
    discountPackage:1,
    openid: '',
    message: '',
    warning: true,
    move:true,
    invoice:false,
    email:'',
    navTitle:'',
    helpInfo:[
      { name: '隐私协议', img:'/images/my-icon.png'},
      { name: '风险提醒', img: '/images/my-icon.png' },
      { name: '免责声明', img: '/images/my-icon.png' },
      { name: '服务协议', img: '/images/my-icon.png' }
    ],
    helpIndex:0,
    change_num:0,
    showChange:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   console.log(options)
    let list = JSON.parse(options.data)
    if (list.flag == 0) {
      console.log(0, '====')
      let arr = list.discount_package.replace(/[\u4e00-\u9fa5]/g, ',').split(',')
      console.log(arr[1])
      if (arr[1] == '' || arr[1]=='undefined'){
        list.total = (list.media_fee * arr[0]* list.days).toFixed(2)
        console.log(list.total)
        list.all_fee = (list.media_fee * arr[0]* list.days + list.fabrication_fee).toFixed(2)
      }else{
      list.total = (list.media_fee *arr[0]*arr[1]/10* list.days).toFixed(2)
      console.log(list.total )
      list.all_fee = (list.media_fee * arr[0] * arr[1] / 10 * list.days + list.fabrication_fee).toFixed(2)
      }
      console.log(list, 'json')
      this.setData({
        list: list,
        isShowDetail: false,
        navTitle:'等待买家付款'
      })
      wx.setNavigationBarTitle({
        title: this.data.navTitle
      })
    } else if (list.flag == 1) {
      console.log(1, '====')
      this.setData({
        isShowDetail: true,
        navTitle: '订单详情'
      })
      wx.setNavigationBarTitle({
        title: this.data.navTitle
      })
      this.getFromMy(list.bookid)
    }
  
    this.setData({
      openid: app.globalData.openID
    })
    // this.getFromMy()
  },
  // 留言
  textareaChange(e) {
    // console.log(e)
    this.setData({
      message: e.detail.value
    })
  },
  // 邮箱
  emaiChange(e) {
    // console.log(e)
    this.setData({
      email: e.detail.value
    })
  },
  // 上刊消息提示按钮切换
  switchChange(e) {
    // console.log(e)
    this.setData({
      warning: e.detail.value
    })
  },
  // 移位
  switchMove(e) {
    // console.log(e)
    this.setData({
      move: e.detail.value
    })
  },
  moveNote(){
wx.showModal({
  title: '接受移位提示',
  content: '当有其他商业客户选定同样位置时，该广告画面移至同站内临近空位。',
})
  },
  // 发票
  switchInvoice(e) {
    // console.log(e)
    this.setData({
      invoice: e.detail.value
    })
  },
  // 上传图片
  selectImg() {
    console.log(1)
    let _this = this;
    wx.chooseImage({
      success: function(res) {
        console.log(res, '=====')
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: baseUrl+'booking/uploadFile',
          filePath: tempFilePaths[0],
          name: 'image',
          header: {
            "Content-type": "multipart/form-data"
          },
          success: res => {
            console.log(res,'-----')
            if (res.statusCode === 200) {
              let result = JSON.parse(res.data)
              // console.log(result)
              if (result.code === 200) {
                _this.setData({
                  pics: result.data,
                  thumbnail:false
                })
                console.log(_this.data.pics)
              }
            }
          },
          fail: err => {
            console.log(err)
          }
        })
      },
    })
  },
  // 换画次数
  changeNum(){
    this.setData({
      showChange:true
    })
  },
  changeSelect(e){
    this.setData({
      showChange: false,
      change_num:e.currentTarget.dataset.value
    })
  },
  changeNumNote(){
    wx.showModal({
      title: '换画次数提示',
      content: '上刊期间可换画，加收制作费1000元。',
    })
  },
  // 提交订单
  placeOrder() {
    console.log('tijiao')
    console.log(this.data.list.start_date.replace(/\//g, '-'))
    console.log(this.data.pics)
    if (this.data.email==''){
      wx.showModal({
        title: '提示',
        content: '邮箱不能为空',
      })
      return
    }
    let emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    if(!emailReg.test(this.data.email)){
      wx.showModal({
        title: '提示',
        content: '请正确填写邮箱',
      })
      return
    }
    let data = {
      endDate: this.data.list.end_all_date.replace(/\//g, '-'),
      startDate: this.data.list.start_date.replace(/\//g, '-'),
      packageId: this.data.list.packageId,
      allFee: this.data.list.all_fee,
      pictures: this.data.pics.slice(this.data.pics.lastIndexOf('/')+1),
      message: this.data.message,
      inform: this.data.warning,
      userOpenId: this.data.openid,
      mediaId: Number(this.data.list.media_id),
      discountPackage: this.data.list.discountPackageId,
      moveOrNot:this.data.move,
      contactEmail:this.data.email,
      haveInvoice:this.data.invoice,
      changeNum: this.data.change_num
    }
    console.log(data)
    wx.request({
      url: baseUrl+'booking/create',
      method:'POST',
      dataType:'JSON',
      header:{
        'content-type':'application/json'
      },
      data:data,
      success:res=>{
        console.log(res,'1111111')
        if(res.statusCode==200){
          let result=JSON.parse(res.data)
          if(result.code==200){
            let info = {
              mediaName: this.data.list.name,
              amount: this.data.list.all_fee,
              bookingCode: result.data.bookingCode,
              bookingID: result.data.bookingID
            }
            console.log(info)
             wx.navigateTo({
            url: '/pages/buy/buy?info='+JSON.stringify(info),
          })
          }
         
        }
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  //从我的订单跳转过来的获取信息
  getFromMy(id){
    wx.request({
      url: baseUrl+'booking/details',
      method:'POST',
      dataType:'JSON',
      header:{
        'content-type':'application/json'
      },
      data:{
        bookingID:id
      },
      success:res=>{
        console.log(res,'13213242')
        if(res.statusCode==200){
          let result=JSON.parse(res.data)
          if(result.code==200){
            console.log(result.data)
            result.data.start_date= result.data.start_date.slice(0,10).replace(/-/g,'/')
            result.data.endWeek = this.getDays(new Date(result.data.end_date).getDay())
            result.data.end_date = result.data.end_date.slice(5,10).replace(/-/g,'/')
            result.data.startWeek = this.getDays(new Date(result.data.start_date).getDay())
           
            console.log(result.data)
            if(result.data.message==''){
              result.data.message='暂无留言'
            }
            if (/.(png|jpg|jpeg|gif)$/g.test(result.data.bookingPicture)){
              result.data.showImg=true
            }else{
              result.data.showImg=false
            }
            this.setData({
              list: result.data,
              message: result.data.message,
              warning: result.data.inform,
              move: result.data.move_or_not,
              invoice: result.data.have_invoice,
              email: result.data.contact_email,
              change_num: result.data.change_num
            })
          }
        }
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  // 获取星期数
  getDays(week) {
    let str = "周";
    switch (week) {
      case 0:
        str += "日";
        break;
      case 1:
        str += "一";
        break;
      case 2:
        str += "二";
        break;
      case 3:
        str += "三";
        break;
      case 4:
        str += "四";
        break;
      case 5:
        str += "五";
        break;
      case 6:
        str += "六";
        break;
    }
    return str;
  },
  // 跳转到帮助信息详情页
  goHelp(e) {
    wx.navigateTo({
      url: '/pages/help/help?index=' + e.currentTarget.dataset.index + '&title=' + e.currentTarget.dataset.title,
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