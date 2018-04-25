const app = getApp()
Page({
  data: {
    textareaShow: true
  },
  onLoad: function (options) {
    switch(options.resource){
      case "save":
        this.setData({
          bid: options.bid,
          type:'save',
          bless: app.globalData.bless,
          sid: app.globalData.bless.sid.value
        });
        break;
      case "index":
        this.setData({
          sid: options.sid,
          type:'index'
        });
        break;
      default:
        break  
    }
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
    this.hisName = this.selectComponent('#his_name');
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
      }, this.dataInit);
    }
    else {
      wx.showModal({
        title: '警告',
        content: '你未登录',
      });
    }
    if(this.data.type == 'save'){

    }
  },
  dataInit(){
    if(this.data.type == 'save'){
      this.myName.input(this.data.bless.nickName.value);
      this.hisName.input(this.data.bless.receiver.value);
      this.blessWord.input(this.data.bless.content.value);
      app.globalData.bless.bid = {
        name: 'bid',
        value: this.data.bid
      };
    }
    else{
      this.myName.input(this.data.userInfo.nickname);
      app.globalData.bless['avatarUrl'] = { name: 'avatarUrl', 'value': this.data.userInfo.avatarurl };
      app.globalData.bless['sid'] = { name: 'sid', 'value': this.data.sid };
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
          url: '../save/save?sid=' + that.data.sid  + '&resource=edit&bid=' + e.detail.result.data.data.bid ,
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