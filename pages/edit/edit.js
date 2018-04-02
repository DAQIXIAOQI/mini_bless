const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      textareaShow: true 
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
    wx.setNavigationBarTitle({

      title: "编辑祝福内容"

    });
    wx.setNavigationBarColor({

      frontColor: '#ffffff',

      backgroundColor: '#f0695b'

    });

    this.blessList = this.selectComponent("#blessList");
    this.blessWord = this.selectComponent("#bless_word");
    this.redPacket = this.selectComponent("#redPacket");
  },
  
 
  onShareAppMessage: function () {
  
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
  switch(e.detail.mark){
    case "redPack":
       this.toggleTextarea();
       this.redPacket.toggle();
       break
       default :
         break
  }
  },
  toggleTextarea(){
     this.setData({
       textareaShow:!this.data.textareaShow
     });
     console.log(this.data.textareaShow)
  }
})