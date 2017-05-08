Page({
  data:{
    movie_List:[]
  },
  movie_show:function(event){
    var id= event.target.dataset.id;
    var that = this;
    console.log(event)
     wx.navigateTo({
      url: '/pages/movieDetail/movieDetail?id='+id
    })
    
  },
  appMovie:getApp(),
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     var that = this;
    this.setData({
      movie_List:that.appMovie.globalData.userInfo
    })
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