const app = getApp()
Page({
  data: {
    commentList: [],
    isShowComment: false,
    ismoving: false,
    isLike: false,
    isliking: false,
    isLogin: false,
    comment: ''
  },
  onLoad: function (options) {
    let that = this;
    if (!app.globalData.userInfo) {
      app.login(function () { that.setData({ isLogin: true, userInfo: app.globalData.userInfo, bdata: { bid: options.bid } }, that.getBless); });
    }
    else {
      that.setData({ isLogin: true, userInfo: app.globalData.userInfo, bdata: { 'bid': options.bid } }, that.getBless);
    }
  },
  onReady: function () {
    this.commentBox = this.selectComponent("#_comment");
    this.slide = this.selectComponent("#slide");
  },
  getBless() {
    const that = this;
    const $data = Object.assign(app.globalData.ajaxPublic, this.data.bdata);
    wx.request({
      url: app.globalData.baseServer + '/index.php/api/bless/blessings_detail',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: $data,
      success(res) {
        that.setData({
          bless: res.data.data
        });
        that.getSlide(res.data.data.sid);
      },
      fail(res) {
        console.log(res);
      }
    });

  },
  getSlide(e) {
    const that = this;
    const $data = Object.assign(app.globalData.ajaxPublic, { id: e });
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
    this.commentLoad = this.selectComponent("#commentLoad");
  },
  loadComment(e) {
    let arr = this.data.commentList;
    let data = e.detail.result.data.data;
    if (data.length == 0) {
      this.commentLoad.loadAll();
    }
    arr = arr.concat(data);
    arr = arr.reverse();
    this.setData({
      commentList: arr
    });
  },
  toggleComment() {
    const that = this;
    this.setData({
      ismoving: true
    });
    setTimeout(function () {
      if (!that.data.isShowComment) {
        that.commentLoad.reset();
        that.commentLoad.loading();
      }
      else {
        that.setData({
          commentList: []
        });
      }
      that.setData({
        isShowComment: !that.data.isShowComment
      });
    }, 1000);
    setTimeout(function () {
      that.setData({ ismoving: false });
    }, 2500);
  },
  toggleLike() {
    this.setData({
      isliking: true,
    });
    if (this.data.isLike || this.data.isliking ) return;
    const that = this;
    const $data = Object.assign(app.globalData.ajaxPublic, { bid: this.data.bid, wid: this.data.bless.uid });
    wx.request({
      url: app.globalData.baseServer + '/index.php/api/bless/blessings_praise',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      data: $data,
      dataType: 'json',
      success(res) {
        that.setData({
          isLike: true
        });
      },
      fail(res) {
        console.log(res);
        wx.showModal({
          title: '出错了',
          content: '请重新点赞',
          showCancel: false
        });
        that.setData({
          isLike: false,
          isliking: false
        });
      }
    })

  },
  toPage() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  submitComment() {
    let that = this;
    let comment = {
      wid: this.data.userInfo.id,
      bid: this.data.bdata.bid,
      content: this.data.comment
    }
    if (this.data.content == '') {
      wx.showToast({
        title: '不能提交空值',
        icon: 'none'
      });
      return
    }
    comment = Object.assign(app.globalData.ajaxPublic, comment);
    wx.request({
      url: app.globalData.baseServer + '/index.php/api/bless/blessings_comment',
      data: comment,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success(res) {
        if (res.data.status) {
          that.commentBox.clear();
          wx.showModal({
            title: '恭喜',
            content: '提交成功！去查看留言？',
            cancelText: '不了',
            confirmText: '好的',
            success(res) {
              if (res.confirm) {
                that.toggleComment();
              }
            }
          });
        }
      },
      fail(res) { console.log(res); }
    })

  },
  commentInput(e) {
    this.setData({
      comment: e.detail.value
    });
  }
})