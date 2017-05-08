Page({
  data: {
     movie_List:[],
     music_List:[],
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000
  },
  movie_show:function(event){
    var id= event.target.dataset.id;
    var that = this;
    console.log(event)
     wx.navigateTo({
      url: '/pages/movieDetail/movieDetail?id='+id
    })
    
  },
 music_show:function(event){
     wx.switchTab({
      url: '../audio/audio'
    })   
  },
  appIndex:getApp(),
  onLoad:function(options){
     var that = this;
    this.setData({
      movie_List:that.appIndex.globalData.userInfo,
      music_List:that.appIndex.globalData.musicList  
    })
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  }
})