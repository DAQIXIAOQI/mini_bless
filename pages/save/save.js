const app = getApp()
Page({
  data: {
    luckyDraw: false
  },
  onLoad: function (options) {
    const that = this;
    const $data = Object.assign(app.globalData.ajaxPublic, { id: options.id });
    this.setData({
      blessData: app.globalData.bless,
      userInfo: app.globalData.userInfo,
      bid: options.bid
    });
    wx.request({
      url: app.globalData.baseServer + '/index.php/api/bless/bless_style_detail',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: $data,
      dataType: 'json',
      success(res) {
        console.log(res);
        let list = new Array();
        for (let item in res.data.data.imglist) {
          list.push(app.globalData.imgServer + res.data.data.imglist[item].url);
        }
        that.setData({
          imgUrls: list,
        });
      },
      fail(res) {
        wx.showModal({
          title: '出错了',
          content: '服务器开小差了，请稍后再试',
          showCancel: false
        })
      }
    });
  },
  onReady: function () {
    this.slide = this.selectComponent("#slide");
  },
  toEdit(e) {
    wx.navigateBack({
      delta: 1
    });
  },
  toIndex() {
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
    const that = this;

    return {
      title: '我给你写了一段祝福',
      path: '/pages/get/get?bid=' + this.data.bid,
      success: function (res) {
        //  wx.showModal({
        //    title: '恭喜',
        //    content: '分享成功,',
        //    showCancel:false
        //  })
        that.setData({
          luckyDraw: true
        }, function () {
          const luckyDraw = that.selectComponent("#luckyDraw");
          luckyDraw.toggle();
        });

      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})