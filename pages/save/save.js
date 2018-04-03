const app = getApp()
Page({
  data: {
    imgUrls: ['http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png']  
  },
  onLoad: function (options) {
     console.log(options,app.globalData);
     this.setData({
       blessData:app.globalData.bless,
       userInfo: app.globalData.userInfo
     });

  },
  onReady: function () {
  
  },
  toEdit(e){
     wx.navigateBack({
       delta: 1
     })
  },
  toIndex(){
    wx.showModal({
      title: '提示',
      content: '你确定要离开这个页面？(可在个人中心-我的祝福里重新打开)',
      success: function (res) {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else if (res.cancel) {
        }
      }
    })
    
  },
  onShareAppMessage: function (res) {
    return {
      title: '我给你写了一段祝福',
      path: '/pages/get/get',
      success: function (res) {
        wx.showToast({
          title: '祝贺你，分享成功',
          icon:'success'
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})