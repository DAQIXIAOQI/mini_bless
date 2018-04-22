const app = getApp()
Page({
  data: {
    topBg:"http://dev.guotu.zsylife.cn/minidata/personalbg.png",
    isLogin:false
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
    let that =  this ;
    if (!app.globalData.userInfo){
      app.login(function(){
        that.setData({
          isLogin:true,
          userInfo: app.globalData.userInfo
        });
      })
    }
    else{
      this.setData({
        isLogin: true,
        userInfo: app.globalData.userInfo
      });
    }  
    wx.setNavigationBarTitle({

      title: "个人中心"

    })
  },
  toPage(e){
    let data =e.currentTarget.dataset ;
    wx.navigateTo({
      url: '../receive/receive?column=' + data.column + "&name=" + data.name + "&url=" + data.url
    });
  },
  toRemind(e) {
    wx.navigateTo({
      url: '../remind/remind'
    });
  }
})