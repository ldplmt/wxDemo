// pages/movieDetail/movieDetail.js
Page({
  data:{
     movieDetail_list:{}
  },
  appMovie:getApp(),
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.id)
     var that = this;
    this.setData({
      movieDetail_list:that.appMovie.globalData.userInfo[options.id]
    })
  },
  show_play:function(){
    var that = this;
    wx.navigateTo({
      url: '/pages/video/video?url_A='+that.data.movieDetail_list.url
    })
    console.log(that.data.movieDetail_list.url)
  
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})