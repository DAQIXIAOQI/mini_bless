const app = getApp()
Page({
  data: {
      textareaShow: true
      
  },
  onLoad: function (options) {
     console.log(options);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    }
    else {
      wx.showModal({
        title: '警告',
        content: '你未登录',
      });
    }
     this.setData({
       pid : options.id
     });
  },
  onReady: function () {
    console.log(this.data.userInfo);
    wx.setNavigationBarTitle({
      title: "编辑祝福内容"
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#f0695b'
    });
    app.globalData.bless['my_avatar'] = { name: 'my_avatar','value':app.globalData.userInfo.avatarUrl };
    this.blessList = this.selectComponent("#blessList");
    this.blessWord = this.selectComponent("#bless_word");
    this.redPacket = this.selectComponent("#redPacket");
    this.cartPacket = this.selectComponent('#cartPacket');
  },
  showList:function(){
    this.toggleTextarea();
    this.blessList.toggle();
  },
  changeBlessWord:function(e){
    console.log(e);
    this.toggleTextarea();
    this.blessWord.input(e.detail.text);
  },
  con(e){
    console.log(e);
  switch(e.detail.mark){
    case "redPacket":
       this.toggleTextarea();
       this.redPacket.toggle();
       break;
    case "cartPacket":  
      this.toggleTextarea();
      this.cartPacket.toggle();
      break; 
       default :
         break
  }
  },
  toggleTextarea(){
     this.setData({
       textareaShow:!this.data.textareaShow
     });
  },
  giftSet(e){
    console.log(e);
    this.toggleTextarea();
  },
  save(e){
    let that = this ;
    wx.navigateTo({
      url: '../save/save?id=' + that.data.pid  + '&resource=index',
    })
  }
})