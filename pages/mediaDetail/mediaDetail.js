// pages/mediaDetail/mediaDetail.js
import { baseUrl } from '../common/url.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mediaId: '',
    startDate: '',
    startDateEnd: '',
    detialInfo: {},
    total: null,
    stratweek: '',
    stratTime: '',
    endWeek: '',
    endTime: '',
    endAllTime:'',
    navbar: ['媒体详情', '产品参数', '相关规则'],
    currentTab: 0,
    showBuy: false,
    showTask: false,
    animationData: '',
    setMel: [
      { text:'2块9折',id:2},
      { text: '5块8折', id: 3 },
      { text: '10块7折', id: 4 },
      { text: '1块', id: 1 }
      ],
    setMealIndex:3,
    setMealInfo: { text: '1块', id: 1 },
    cycle: [
      { text: '基础款3天', id: 1 },
      { text: '豪华款7天', id: 2 },
      { text: '尊享版28天', id: 3 },
      {text:'其他',id:4}
      ],
    cycleIndex: 3,
    cycleInfo: { text: '其他', id: 4 },
    otherStart:null,
    otherEnd:null,
    otherSweek:null,
    otherEweek:null,
    otherDay:null,
    otherAllTime:null
  },
  // 日期选择
  startChange: function(e) {
    // console.log(e.detail.value)
    let arr = new Date(e.detail.value)
    let week = arr.getDay()
    let day = this.getDays(week)
    this.setData({
      stratTime: e.detail.value.replace(/-/g, '/'),
      stratweek: day,
      otherStart: e.detail.value.replace(/-/g, '/'),
      otherSweek: day
    })
  },
  endChange: function(e) {
    // console.log(e.detail.value)
    let arr = new Date(e.detail.value)
    let week = arr.getDay()
    let day = this.getDays(week)
    this.setData({
      endTime: e.detail.value.slice(5).replace(/-/g, '/'),
      endAllTime: e.detail.value,
      endWeek: day,
      otherEnd: e.detail.value.slice(5).replace(/-/g, '/'),
      otherEweek: day,
      otherAllTime: e.detail.value
    })
    // let totalStart = this.data.stratTime.replace(/\//g, '');
    // let totalEnd = e.detail.value.replace(/-/g, '');
    let totalDay = this.dateDiff('D', this.data.stratTime, e.detail.value);
    this.setData({
      total: totalDay,
      otherDay: totalDay
    })
  },
  // 计算改变的总天数
  dateDiff(interval, date1, date2) {
    console.log(date1,date2,'====')
    var objInterval = { 'D': 1000 * 60 * 60 * 24, 'H': 1000 * 60 * 60, 'M': 1000 * 60, 'S': 1000, 'T': 1 };
    interval = interval.toUpperCase();
    var dt1 = Date.parse(date1.replace(/-/g, '/'));
    var dt2 = Date.parse(date2.replace(/-/g, '/'));
    console.log(dt2,dt1)
    console.log(objInterval[interval])
    try {
      console.log(Math.round((dt2 - dt1) / objInterval[interval]))
      return Math.round((dt2 - dt1) / objInterval[interval]);
    }
    catch (e) {
      return e.message;
    }
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

  //点击切换
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  // 点击立即购买显示购买
  goBuy() {
    console.log(this.data.total)
    if(this.data.total===3){
      let data = { text: '基础款3天', id: 1 }
      this.setData({
        cycleIndex:0,
        cycleInfo:data
      })
    } else if (this.data.total === 7){
      let data = { text: '豪华款7天', id: 2 }
      this.setData({
        cycleIndex: 1,
        cycleInfo: data
      })
    } else if (this.data.total === 28){
      let data = { text: '尊享版28天', id: 3 }
      this.setData({
        cycleIndex: 2,
        cycleInfo: data
      })
    }
    let animation = wx.createAnimation({
      duration: 200,
      timingFuction: 'ease',
      delay: 0
    })
    this.animation = animation;
    animation.translateY(930).step();
    this.setData({
      animationData: animation.export(),
      showBuy: true,
      showTask: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 0)
  },
  // 关闭购买
  closeBuy() {
    this.animation.translateY(930).step();
    this.setData({
      animationData: this.animation.export(),
      showBuy: false,
      showTask: false
    })
  },
  // 调转到详情页面
  goToBuy() {
    let data = {
      media_id: this.data.mediaId,
      flag:0,
      name: this.data.detialInfo.name,//标题名字
      actual_width: this.data.detialInfo.actual_width,//实际宽度
      actual_height: this.data.detialInfo.actual_height,//实际高度
      media_code: this.data.detialInfo.media_code,//媒体编号
      media_fee: this.data.detialInfo.media_fee,//单价
      fabrication_fee: this.data.detialInfo.fabrication_fee,//制作费用
      start_date: this.data.stratTime,//开始时间
      end_date: this.data.endTime,//结束时间
      end_all_date: this.data.endAllTime,
      startWeek: this.data.stratweek,//开始周
      endWeek: this.data.endWeek,//结束周
      days: this.data.total,//一共几天
      pictures: this.data.detialInfo.pictures,//图片
      discount_package: this.data.setMealInfo.text || '1块',
      discountPackageId: this.data.setMealInfo.id ||1,
      package: this.data.cycleInfo.text || '其他',
      packageId: this.data.cycleInfo.id || 4
    }
    console.log(data)
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?data=' + JSON.stringify(data),
    })
  },
  // 改变套餐
  mealChange(e){
    console.log(e.currentTarget.dataset.name)
    this.setData({
      setMealIndex:e.currentTarget.dataset.index,
      setMealInfo: e.currentTarget.dataset.name
    })
  },
  // 改变周期
  cycleChange(e){
    console.log(e)
    if(e.currentTarget.dataset.name.id==4){
      console.log(this.data.otherEweek)
      this.setData({
        cycleIndex: e.currentTarget.dataset.index,
        cycleInfo: e.currentTarget.dataset.name,
        endTime: this.data.otherEnd,
        total: this.data.otherDay,
        endWeek: this.data.otherEweek,
        endAllTime:this.data.otherAllTime
      })
    }else{
      console.log(1222)
    let day = e.currentTarget.dataset.name.text.replace(/[\u4e00-\u9fa5]/g,'')
    let date = new Date(this.data.stratTime.replace(/\//g,'-'));
    let days = date.getDate()
    let endDate=new Date(date.setDate(days+Number(day)))
    let endYear=endDate.getFullYear()
    let endMouth=endDate.getMonth()+1
    let endDay=endDate.getDate()
    endMouth < 10 ? endMouth = `0${endMouth}`:endMouth = endMouth
    endDay<10?endDay=`0${endDay}`:endDay=endDay
    let endTime = `${endYear}/${endMouth}/${endDay}`
    this.setData({
      cycleIndex: e.currentTarget.dataset.index,
      cycleInfo:e.currentTarget.dataset.name,
      endTime:endTime.slice(5),
      total:day,
      endAllTime:endTime,
      endWeek: this.getDays(new Date(endTime).getDay())
    })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      mediaId: options.id
    })
    console.log(options, this.data.mediaId)
    let startdate = new Date();
    let setDates = new Date(startdate.setDate(startdate.getDate()+7))
    let year = setDates.getFullYear();
    let mouth = setDates.getMonth() + 1;
    let day = setDates.getDate() ;
    console.log(year,mouth,day,'0000000')
    day < 10 ? day = `0${day}` : day
    mouth < 10 ? mouth = `0${mouth}` : mouth
    let start = `${year}-${mouth}-${day}`;//默认开始时间为当前时间的后7天

    let enddate=new Date()
    console.log(enddate.getDate(), '======')
    let endsDays = new Date(enddate.setDate(enddate.getDate() + 11))
    let endsYear = endsDays.getFullYear()
    let endsMouth = endsDays.getMonth()+1
    let endsDayone = endsDays.getDate()
    console.log(endsYear, endsMouth, endsDayone,'11111')
    endsDayone < 10 ? endsDayone = `0${endsDayone}` : endsDayone = endsDayone
    endsMouth < 10 ? endsMouth = `0${endsMouth}` : endsMouth = mouth
    let endTime = `${endsYear}-${endsMouth}-${endsDayone}`;//默认的结束时间为当前时间的后10天

    let enddates=new Date()
    let endDate = new Date(enddates.setDate(enddates.getDate() + 37));
    let endYear = endDate.getFullYear();
    let endMouth =endDate.getMonth()+1;
    let endDay = endDate.getDate();
    endDay < 10 ? endDay = `0${endDay}` : endDay
    endMouth < 10 ? endMouth = `0${endMouth}` : endMouth
    let endStart = `${endYear}-${endMouth}-${endDay}`;//可选择的技术时间是当前时间加一个月

    console.log(start,endStart,endTime,'------')
    let total = this.dateDiff('D',start, endTime);//计算一共几天
    console.log(Number(total))
    this.setData({
      startDate: start,
      startDateEnd: endStart,
      stratTime: start.replace(/-/g, '/'),
      endTime: endTime.slice(5).replace(/-/g, '/'),
      endAllTime:endTime,
      total: total,
      stratweek: this.getDays(new Date(start).getDay()),
      endWeek: this.getDays(new Date(endTime).getDay()),
      otherStart: start.replace(/-/g, '/'),
      otherEnd: endTime.slice(5).replace(/-/g, '/'),
      otherSweek: this.getDays(new Date(start).getDay()),
      otherEweek: this.getDays(new Date(endTime).getDay()),
      otherDay:total,
      otherAllTime: endTime
    
    })
    console.log(this.data.total)

    this.getDetailInfo(options.id)

  },
  // 获取信息
  getDetailInfo(id) {
    wx.request({
      url: baseUrl+'media/details',
      method: "POST",
      dataType: 'JSON',
      header: {
        'content-type': 'application/json'
      },
      data: {
        mediaID: id
      },
      success: res => {
        // console.log(res)
        if (res.statusCode == 200) {
          let result = JSON.parse(res.data)
          // console.log(result)
          if (result.code == 200) {
            this.setData({
              detialInfo: result.data
            })
          }
        }
      },
      fail: err => {
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