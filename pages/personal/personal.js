const app = getApp()
Page({
  data: {
    topBg:"http://dev.guotu.zsylife.cn/minidata/personalbg.png",
    userInfo: { id: "82", nickname: "QijIEcoNG", gender: "1", avatarurl: "http://dev.guotu.zsylife.cn/minidata/index01.png"}
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
    // if (app.globalData.userInfo){
    //   this.setData({
    //     userInfo: app.globalData.userInfo
    //   });
    // }  
    wx.setNavigationBarTitle({

      title: "个人中心"

    })
  },
  toPage(e){
    let data =e.currentTarget.dataset ;
    wx.navigateTo({
      url: '../receive/receive?column=' + data.column + "&name=" + data.name + "&url=" + data.url
    });

  }
})