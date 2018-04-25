const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  onLoad: function (options) {
    this.setData({
      bdata: { 'bid': options.id },
      url: app.globalData.api.blessComment
    });
  },
  onReady: function () {
    if (!app.globalData.userInfo) {
      app.login(this.getLikeList);
    }
    else {
      this.getLikeList();
    }
  },
  getLikeList() {
    const $data = Object.assign(app.globalData.ajaxPublic, this.data.bdata);
    const that = this;
    wx.request({
      url: app.globalData.baseServer + app.globalData.api.blessLike,
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      dataType: 'json',
      data: app.globalData.ajaxPublic,
      success(res) {
        console.log(res);
        that.setData({
          likeList: res.data.data.list,
          likeNum:res.data.data.count
        });
      },
      fail(res) {
        console.log(res);
      }
    })

  }

})