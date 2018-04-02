//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    listData: [{ src: 'http://dev.guotu.zsylife.cn/minidata/index01.png' }, { src: 'http://dev.guotu.zsylife.cn/minidata/index02.png' }, { src: 'http://dev.guotu.zsylife.cn/minidata/index03.png' }, { src: 'http://dev.guotu.zsylife.cn/minidata/index02.png' }, { src: 'http://dev.guotu.zsylife.cn/minidata/index01.png' }, { src: 'http://dev.guotu.zsylife.cn/minidata/index03.png' }]
  },
  onLoad: function () {
    wx.setNavigationBarColor({

      frontColor:'#ffffff',

      backgroundColor:'#f0695b'

})
  }
})
