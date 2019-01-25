// pages/media/media.js
import {
  baseUrl
} from '../common/url.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: '',
    startDateEnd: '',
    selectStartTime: null,
    selectEndTime: null,
    startTime: null,
    endTime: null,
    isShowStart: true,
    isEndShow: true,
    keyword: '',
    dates: '20161108',
    hot: '热度推荐',
    hotKey: ['热度推荐', '最新上架'],
    orderBy: 0,
    hotKeyShow: false,
    countryKey: '城市',
    cityID: null,
    country: [],
    countryShow: false,
    priceKey: '价格',
    price: [{
      flag: null,
      price: '全部'
    },
    {
      flag: 0,
      price: '1000-2000'
    },
    {
      flag: 1,
      price: '2000-3000'
    },
    {
      flag: 2,
      price: '3000以上'
    }
    ],
    selectIndex: 0,
    mediaFee: null,
    priceShow: false,
    mediaData: [],
    page: 1,
    pageSize: 10,
    totalCount:0,
    stationID:null

  },
  // 日期选择
  startChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      isShowStart: false,
      startTime: e.detail.value.slice(5).replace(/-/g, '/'),
      selectStartTime: e.detail.value
    })
  },
  endChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      isEndShow: false,
      endTime: e.detail.value.slice(5).replace(/-/g, '/'),
      selectEndTime: e.detail.value
    })
    let data = {
      page: this.data.page,
      pageSize: this.data.pageSize,
      keyword: this.data.keyword,
      startEndDate: [this.data.selectStartTime, this.data.selectEndTime],
      cityID: this.data.cityID,
      orderBy: this.data.orderBy,
      mediaFee: this.data.mediaFee,
      stationID: null
    }
    console.log(data)
    this.getList(data)
  },
  // 输入框关键字
  changeKeyword(e) {
    this.setData({
      keyword: e.detail.value
    })
    let data = {
      page: this.data.page,
      pageSize: this.data.pageSize,
      keyword: this.data.keyword,
      startEndDate: [this.data.selectStartTime, this.data.selectEndTime],
      cityID: this.data.cityID,
      orderBy: this.data.orderBy,
      mediaFee: this.data.mediaFee,
      stationID: null
    }
    this.getList(data)
  },
  // 展示热度推荐下拉框
  showHot(e) {
    this.setData({
      hotKeyShow: !this.data.hotKeyShow,
      priceShow: false,
      countryShow: false,
      selectIndex: 0
    })
  },
  // 点击热度推荐
  clickHot(e) {
    this.setData({
      hot: this.data.hotKey[e.currentTarget.dataset.id],
      orderBy: e.currentTarget.dataset.id,
      hotKeyShow: false
    })
    let data = {
      page: this.data.page,
      pageSize: this.data.pageSize,
      keyword: this.data.keyword,
      startEndDate: [this.data.selectStartTime, this.data.selectEndTime],
      cityID: this.data.cityID,
      orderBy: this.data.orderBy,
      mediaFee: this.data.mediaFee,
      stationID: null
    }
    if (this.data.startTime != null && this.data.endTime == null) {
      wx.showModal({
        title: '请选择时间',
        content: '选择了开始日期必须选择结束日期',

      })
    } else {
      console.log(data)
      this.getList(data)
    }

  },
  // 点击城市下拉框
  countryShow() {
    this.setData({
      countryShow: !this.data.countryShow,
      hotKeyShow: false,
      priceShow: false,
      selectIndex: 1
    })
  },
  // 点击城市选择
  countryClick(e) {
    console.log('城市', e)
    this.setData({
      countryKey: e.currentTarget.dataset.name,
      cityID: e.currentTarget.dataset.id,
      countryShow: false
    })
    let data = {
      page: this.data.page,
      pageSize: this.data.pageSize,
      keyword: this.data.keyword,
      startEndDate: [this.data.selectStartTime, this.data.selectEndTime],
      cityID: this.data.cityID,
      orderBy: this.data.orderBy,
      mediaFee: this.data.mediaFee,
      stationID: null
    }
    if (this.data.startTime != null && this.data.endTime == null) {
      wx.showModal({
        title: '请选择时间',
        content: '选择了开始日期必须选择结束日期',

      })
    } else {
      console.log(data)
      this.getList(data)
    }
  },
  // 点击价格下离开
  priceShow() {
    this.setData({
      priceShow: !this.data.priceShow,
      hotKeyShow: false,
      countryShow: false,
      selectIndex: 2
    })
  },
  // 点击价格选择
  priceClick(e) {
    console.log(e)
    this.setData({
      priceKey: e.currentTarget.dataset.name,
      mediaFee: e.currentTarget.dataset.id,
      priceShow: false
    })
    let data = {
      page: this.data.page,
      pageSize: this.data.pageSize,
      keyword: this.data.keyword,
      startEndDate: [this.data.selectStartTime, this.data.selectEndTime],
      cityID: this.data.cityID,
      orderBy: this.data.orderBy,
      mediaFee: this.data.mediaFee,
      stationID:null
    }
    if (this.data.startTime != null && this.data.endTime == null) {
      wx.showModal({
        title: '请选择时间',
        content: '选择了开始日期必须选择结束日期',

      })
    } else {
      console.log(data)
      this.getList(data)
    }
  },
  // 跳转到详情页
  goDetial(e) {
    // console.log(e)
    wx.navigateTo({
      url: '/pages/mediaDetail/mediaDetail?id=' + e.currentTarget.dataset.id
    })
  },

  /**
   * 生命周期函数监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    options.stationID ? options.stationID = options.stationID : options.stationID=null
    let date = new Date();
    let setDates = new Date(date.setDate(date.getDate() + 7));
    let year = setDates.getFullYear();
    let mouth = setDates.getMonth() + 1;
    let day = setDates.getDate();
    let enddates=new Date()
    let endDate = new Date(enddates.setDate(enddates.getDate() + 37))
    console.log(endDate)
    let endYear = endDate.getFullYear();
    let endMouth = endDate.getMonth()+1;
    let endDay = endDate.getDate();
    let endStart = `${endYear}-${endMouth}-${endDay}`;
    let start = `${year}-${mouth}-${day}`;
    console.log(start,endStart,'------')
    this.setData({
      startDate: start,
      startDateEnd: endStart,
      stationID: options.stationID
    })
    let infoList={
      page: this.data.page,
      pageSize: this.data.pageSize,
      keyword: null,
      startEndDate: null,
      cityID: null,
      orderBy: null,
      mediaFee: null,
      stationID: this.data.stationID
    }
    this.getCountryList()
    this.getList(infoList)
  },
  // 获取城市
  getCountryList() {
    wx.request({
      url: baseUrl + 'media/listOfSearchInfo',
      method: "POST",
      dataType: 'JSON',
      header: {
        'contenttype': 'application/json'
      },
      success: (res) => {
        console.log('33333333', res)
        if (res.statusCode == 200) {

          let result = JSON.parse(res.data);
          let all = {
            "label": "全部",
            "value": null
          }
          result.data.unshift(all)
          if (result.code == 200) {
            this.setData({
              country: result.data
            })
          }
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  // 获取信息列表
  getList(data) {
    wx.request({
      url: baseUrl + 'media/list',
      method: 'POST',
      dataType: 'JSON',
      header: {
        'contenttype': 'application/json'
      },
      data: data,
      success: (res) => {
        console.log(res)
        if (res.statusCode == 200) {

          let result = JSON.parse(res.data)
          console.log(result)
          if (result.code == 200) {
            this.setData({
              mediaData: result.data.list,
              totalCount:result.data.count
            })
          }
        }
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数监听页面初次渲染完成
   */
  onReady: function () {


  },


  /**
   * 生命周期函数监听页面显示
   */
  onShow: function () {


  },


  /**
   * 生命周期函数监听页面隐藏
   */
  onHide: function () {


  },


  /**
   * 生命周期函数监听页面卸载
   */
  onUnload: function () {


  },


  /**
   * 页面相关事件处理函数监听用户下拉动作
   */
  onPullDownRefresh: function () {


  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
console.log('daodile')
    wx.showLoading({
      title: '加载中......',
    })
    console.log(this.data.page, this.data.totalCount, this.data.pageSize)
    if (this.data.page < Math.ceil(this.data.totalCount / this.data.pageSize)) {
      this.setData({
        page: this.data.page + 1
      })
      let data = {
        page: this.data.page,
        pageSize: this.data.pageSize,
        keyword: this.data.keyword,
        startEndDate: [this.data.selectStartTime, this.data.selectEndTime],
        cityID: this.data.cityID,
        orderBy: this.data.orderBy,
        mediaFee: this.data.mediaFee
      }
      console.log(this.data.page)
      wx.request({
        url: baseUrl + 'media/list',
        method: 'POST',
        dataType: 'JSON',
        header: {
          'content-type': 'application/json'
        },
        data: data,
        success: (res) => {
          console.log(res)
          if (res.statusCode == 200) {
            let result = JSON.parse(res.data)
            console.log(result)
            if (result.code == 200) {
              this.setData({
                mediaData: this.data.mediaData.concat(result.data.list)
              })
              wx.hideLoading()
            }
          }
        },
        fail: (err) => {
          console.log(err)
          wx.hideLoading()
        }
      })
    } else {
      wx.hideLoading()
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {


  }
})

