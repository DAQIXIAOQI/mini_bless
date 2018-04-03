//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: false,
    baseServer: "https://mini.zsylife.cn/",
  },
  login(sus,err){
     
      let that = this ;
      wx.getUserInfo({
        success:function(res){
          that.globalData.userInfo = res.userInfo;
          if (sus) sus();
        },
        fail:function(e){
          wx.showModal({
            title: '警告',
            content: '你拒绝了授权，会导致部分功能无法使用',
            showCancel:false
          });
          if(err) err();
        }  
      })

  }
})