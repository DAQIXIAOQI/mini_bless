//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    listData: [
      { src: 'http://dev.guotu.zsylife.cn/minidata/index01.png', id:0 },
      { src: 'http://dev.guotu.zsylife.cn/minidata/index02.png', id:1 },
      { src: 'http://dev.guotu.zsylife.cn/minidata/index03.png', id:2 },
      { src: 'http://dev.guotu.zsylife.cn/minidata/index02.png', id:3 },
      { src: 'http://dev.guotu.zsylife.cn/minidata/index01.png', id:4 },
      { src: 'http://dev.guotu.zsylife.cn/minidata/index03.png', id:5 }]
  },
  onLoad: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#f0695b'
    });
    if(!app.globalData.userInfo){
       app.login();
    }
  },
  toPage(e) {
    wx.navigateTo({
      url: '../edit/edit?id=' + e.currentTarget.dataset.id + '&resource=index',
    })

  }
})
