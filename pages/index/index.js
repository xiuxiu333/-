//index.js
//获取应用实例
import {
  baseUrl
} from '../common/url.js'
const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
// 地图定位
qqmapsdk = new QQMapWX({
  key: 'RAJBZ-GEF3R-ULQWY-WIFZO-VKJNJ-3ZBZQ' //这里自己的key秘钥进行填充
});
var qqmapsdk;
Page({
  data: {
    province: '',
    city: '', //使用获取定位的参数
    firstPerson: '北京', //不使用定位的时候的城市默认参数
    latitude: '',
    longitude: '',
    selectedProduceDate: '2018/01/01',
    startProduceDate: '2019/12/31',
    endProduceDate: '2019/03/22',
    // 下拉框
    selectPerson: true,
    select: [],
    selectArea: false,
    // 轮播图
    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 200,
    circular: true,
    // 
    labelList: [],
    hotKey: ['北京', '上海'],
    notices:[
      { title: '国贸', id: 1, image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=289332206,259843248&fm=26&gp=0.jpg'},
      { title: '大望路', id: 2, image: 'http://img.juimg.com/tuku/yulantu/121005/219049-12100516491973.jpg' },
      { title: '人大', id: 3, image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547469887775&di=25cce6241c341529af95b38a05c96620&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fe5f11da164a89d8d62541a81860ab7a8c4dade0d965a2-YZzED6_fw658' },
      {
        title: '西单', id: 7, image: 'http://res.keyunzhan.com/img/DiTieNews/20160420/3736490667.png'
      }
    ],
    media1: [{
      tel: "精选媒体",
      selected: 'SEIECTED MEDIA'
    }],
    infoDate: [],
    infoDateList: [],
    imgUrls: [
      '/images/banner.jpg',
      '/images/banner-2.jpg'
    ],
    startDate: '',
    startDateEnd: '',
    selectStartTime: null,
    selectEndTime: null,
    startTime: null,
    endTime: null,
    isShowStart: true,
    isEndShow: true,
    keyword: '',
    id: ''
  },
  //轮播图的切换事件
  swiperChange(e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  goSpecil(e){
    wx.navigateTo({
      url: '/pages/special/special?index='+e.currentTarget.dataset.index,
    })
  },
  // 全部媒体点击跳转页面
  allMedia() {
    wx.navigateTo({
      url: '/pages/media/media?stationID=null',
    })
  },
  //点击选择类型

  clickPerson() {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectArea: true,
        selectPerson: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson: true,
      })
    }
  },
  //点击切换

  mySelect(e) {
    // console.log('lable点击切换文字', e)
    this.setData({
      firstPerson: e.target.dataset.label, //点击下拉框切换文字
      selectPerson: true,
      selectArea: false,
    })
    this.mediaSelection(e.currentTarget.dataset.value)
  },
  dateChange(e) {
    this.setData({
      selectedProduceDate: e.detail.value
    })
  },

  // 点击下拉框选取
  mediaSous() {
    let self = this;
    wx.request({
      url: baseUrl + 'media/listOfSearchInfo',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        // console.log('点击下拉框选取', res.data)
        let all = {
          "label": "全部",
          "value": null
        }
        res.data.data.unshift(all)
        // console.log('all全部', all)
        self.setData({
          labelList: res.data.data
        })
      }
    })
  },

  // 媒体列表展示
  mediaSelection(id) {
    console.log(id, '====')
    const self = this;
    wx.request({
      url: baseUrl + 'media/mediasOfHomePage',
      data: {
        cityID: id
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log('媒体展示', res)
        self.setData({
          // infoDate: res.data.data[0],
          // infoDateList: res.data.data[1]
          infoDate: res.data.data
        })
      }
    })
  },
  // 点击进入详情页
  particulars(e) {
    var idx = e.currentTarget.dataset.idx;
    // console.log('获取到id', idx)
    wx.navigateTo({
      url: '/pages/mediaDetail/mediaDetail?id=' + idx,
    })
  },
  listenerSearchInput: function(e) {
    this.setData({
      searchInput: e.detail.value
    })
  },
  goMedais() {
    wx.reLaunch({
      url: '/pages/media/media?stationID=null',
    })
  },
//图标点击跳转
  goList(e){
    // console.log(e)
    wx.reLaunch({
      url: '/pages/media/media?stationID='+e.currentTarget.dataset.id,
    })
  },
  onLoad() {
    this.mediaSelection(1) //媒体类别
    this.mediaSous() //下拉框
    // 地图定位
    qqmapsdk = new QQMapWX({
      key: 'RAJBZ-GEF3R-ULQWY-WIFZO-VKJNJ-3ZBZQ' //这里自己的key秘钥进行填充
    });
    // console.log(app.globalData.userInfo)
    app.globalData.userInfo ? this.getuser(app.globalData.userInfo) : app.userInfoReadyCallback = this.getuser
    // console.log(app.globalData.openID)
    app.globalData.openID ? this.getopenID(app.globalData.openID) : app.openIDCallback = this.getopenID
    console.log(this.data.city, '=======')
  },

  getuser(userInfo) {
    // console.log(userInfo, '0000000')
    if (userInfo) {
      // let vm = this;
      // vm.getUserLocation();
      // console.log(vm.data.city, '--------')

    }
  },
  getopenID(openid) {
    // console.log(openid, '11111')

  },
  onShow: function() {


  },
  getUserLocation: function() {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        // console.log(JSON.stringify(res))
        console.log(res)
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度

  getLocation: function() {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        // console.log(JSON.stringify(res))
        var latitude = res.latitude; //纬度
        var longitude = res.longitude; //经度
        var speed = res.speed; //速度浮点数
        var accuracy = res.accuracy; //精准度
        vm.getLocal(latitude, longitude)
      },
      fail: function(res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function(latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        // console.log(JSON.stringify(res));
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude
        })
        console.log(vm.data.city)
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      }
    });
  }
})