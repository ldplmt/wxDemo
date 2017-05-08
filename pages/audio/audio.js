function parseLyric(lrc) {
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for(var i=0;i<lyrics.length;i++){
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if(!timeRegExpArr)continue;
        var clause = lyric.replace(timeReg,'');
        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
        }
    }
    return lrcObj;
}
function playlrc(that){
  var lrc=parseLyric(that.data.music.lrc);
  console.log(lrc)
    that.setData({
      music:{
        id:that.data.music.id,
        poster:that.data.music.poster,
        name:that.data.music.name,
        author:that.data.music.author,
        src:that.data.music.src,
        lrc:lrc
      }
    })
}
Page({
  onLoad:function(){
    var that = this;
    that.setData({
      musicList:that.appAudio.globalData.musicList
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight - 80,
           music:that.data.musicList[0]
        })
      }
    })
  },
  onReady: function (e) {
    var that = this;
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    playlrc(that);
  },
  data: {
    bstop:true,
    show:"",
    scrollHeight:0,
    nowplay:0,
    now:0,
    music:{},
    musicList:[]
 },

  appAudio:getApp(),
  playMusic:function(event){
    var idx = event.target.dataset.idx;
    var that = this;
    console.log(event)
    that.setData({
      music:that.appAudio.globalData.musicList[idx] // 我们获取到了一个下标，然后通过这个下标去查找musicList中的对应位置的对象，然后再把这个对象设置到music这个数据内容中
    })     
    setTimeout(function(){
       that.audioCtx.play();
    },500)

    playlrc(that);
  },

  endedHandle:function(){
    var that = this;
    var pos = 0;
    if( that.data.music.id + 1 >= that.data.musicList.length ){
      pos = 0;
    }else{
      pos = that.data.music.id + 1;
    }
    var playingMusic= that.data.musicList[pos];
    that.setData({
      music: playingMusic
    })

    setTimeout(function(){
      that.audioCtx.play();
    },500)
  
    playlrc(that);

  },
  audioPlay: function () {
    var that = this;   
    if(that.data.bstop){
      that.audioCtx.play()
      that.setData({
         bstop:false
      })
    }else{
      that.audioCtx.pause()
      that.setData({
         bstop:true
      })
    }

  },
  audio24: function () {
    var that = this;
    var pos =  that.data.musicList.length;
    if( that.data.music.id + 1 <= 1 ){
      pos = that.data.musicList.length;
    }else{
      pos = that.data.music.id - 1;
    }
    var playingMusic= that.data.musicList[pos];
    that.setData({
      music: playingMusic
    })

    setTimeout(function(){
      that.audioCtx.play();
    },500)
    
    playlrc(that);

  },
  audio14: function () {
    var that = this;
    that.endedHandle();
    playlrc(that);
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  play:function(event){ 
    var that = this;
    var long=parseInt((event.detail.currentTime/event.detail.duration)*100);
    var showlrc=that.data.music.lrc[Math.floor(event.detail.currentTime)];
     that.setData({
      now: event.detail.currentTime,
      nowplay:long,
      show:showlrc
    })
  },

  audio34: function () {
    var that = this;
      this.audioCtx.seek( that.data.now+5)    
  }

  
})