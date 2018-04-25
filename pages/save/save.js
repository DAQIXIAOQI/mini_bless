const app = getApp()
Page({
  data: {
    luckyDraw: false
  },
  onLoad: function (options) {
    switch (options.resource) {
      case "receive":
        this.setData({
          bid: options.bid,
          type: 'receive',
          userInfo: app.globalData.userInfo,
        });
        break;
      case "edit":
        this.setData({
          bid: options.bid,
          sid: options.sid,
          blessData: app.globalData.bless,
          userInfo: app.globalData.userInfo,
          type: 'edit'
        });
        break;
      default:
        break
    }
  },
  onReady: function () {
    this.slide = this.selectComponent("#slide");
    if(this.data.type == 'edit') {
      this.slideInit();
    }
    else{
      this.blessInit(this.slideInit);
    }

  },
  blessInit(fn){
    const that = this;
    const $data = Object.assign(app.globalData.ajaxPublic, { bid: this.data.bid });
    wx.request({
      url: app.globalData.baseServer + app.globalData.api.blessDetail,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: $data,
      dataType: 'json',
      success(res) {
        if(res.data.status){
          const $result = res.data.data;
          let blessData = {
            avatarUrl:{
              name:"avatarUrl",
              value: $result.avatarurl,
            },
            content:{
              name:"content",
              value: $result.content,
            },
            nickName: {
              name: "nickName",
              value: $result.nickname,
            },
            receiver:{
              name: "receiver",
              value: $result.receiver,
            },
            sid:{
              name: "sid",
              value: $result.sid
            },
            bid:{
              name: "bid",
              value: $result.bid
            }
          };
          app.globalData.bless = blessData;
          console.log(blessData);
          that.setData({
            sid : $result.sid,
            view: $result.view,
            blessData: blessData
          },()=>{
            if(fn) fn();
          });
        }
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
  slideInit(){
    const that = this;
    const $data = Object.assign(app.globalData.ajaxPublic, { id: this.data.sid });
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
  toEdit(e) {
    wx.navigateTo({
      url: '../edit/edit?bid=' + this.data.bid +"&resource=save"
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
  },
  toPage(e){
    console.log(e.currentTarget.dataset.url.match('rank'));
    if (e.currentTarget.dataset.url.match('rank')){
      wx.switchTab({
        url: e.currentTarget.dataset.url ,
      });
      return
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.url + '?id=' + this.data.bid,
    });
  }
})