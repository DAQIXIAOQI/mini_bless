const app = getApp()
Page({
  data: {
    textareaShow: true

  },
  onLoad: function (options) {
    this.setData({      
        sid: options.id
    });
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: "编辑祝福内容"
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#f0695b'
    });
    this.myName = this.selectComponent('#my_name');
    this.blessList = this.selectComponent("#blessList");
    this.blessWord = this.selectComponent("#bless_word");
    this.redPacket = this.selectComponent("#redPacket");
    this.cartPacket = this.selectComponent('#cartPacket');
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        sData: {
          "uid": app.globalData.userInfo.id,
          "3rd_session": app.globalData.userInfo['3rd_session']
        }
      }, () => {
        this.myName.input(this.data.userInfo.nickname);
        app.globalData.bless['avatarUrl'] = { name: 'avatarUrl', 'value': this.data.userInfo.avatarurl };
        app.globalData.bless['sid'] = { name: 'sid', 'value': this.data.sid };
      });
    }
    else {
      wx.showModal({
        title: '警告',
        content: '你未登录',
      });
    }

  },
  showList: function () {
    this.toggleTextarea();
    this.blessList.toggle();
  },
  changeBlessWord: function (e) {
    this.toggleTextarea();
    this.blessWord.input(e.detail.text);
    app.globalData.bless['tid'] = { name: 'tid', 'value': e.detail.tid };
  },
  con(e) {
    switch (e.detail.mark) {
      case "redPacket":
        this.toggleTextarea();
        this.redPacket.toggle();
        break;
      case "cartPacket":
        this.toggleTextarea();
        this.cartPacket.toggle();
        break;
      default:
        break
    }
  },
  toggleTextarea() {
    this.setData({
      textareaShow: !this.data.textareaShow
    });
  },
  giftSet(e) {
    this.toggleTextarea();
  },
  save(e) {
    let that = this;
    if(e.detail.result.statusCode == 200){
      wx.navigateTo({
          url: '../save/save?id=' + that.data.sid  + '&resource=edit&bid=' + e.detail.result.data.data.bid ,
      });
    }
    else{
      wx.showModal({
        title: '出错了~！',
        content: '服务器开了小差，请稍后再试~！',
      })
    }
    
  }
})