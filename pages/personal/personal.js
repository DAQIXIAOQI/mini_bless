const app = getApp()
Page({
  data: {
    topBg:"http://dev.guotu.zsylife.cn/minidata/personalbg.png",
    isLogin:false
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
    let that =  this ;
    if (!app.globalData.userInfo){
      app.login(function(){
        that.setData({
          isLogin:true,
          userInfo: app.globalData.userInfo
        });
        //that.getCount();
      })
    }
    else{
      this.setData({
        isLogin: true,
        userInfo: app.globalData.userInfo
      });
      //that.getCount();
    }  
    wx.setNavigationBarTitle({
      title: "个人中心"
    });
  },
  onShow(){
    console.log('getCount');
    this.getCount();
  },
  getCount(){
    const that = this;
    wx.request({
      url: app.globalData.baseServer + '/index.php/api/bless/notice_count',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      dataType: 'json',
      data: app.globalData.ajaxPublic,
      success(res) {
        console.log(res);      
        that.setData({
          noticeCount:parseInt(res.data.data.notice_count),
        });
      },
      fail(res) {
        console.log(res);
      }
    }); 
  },
  toPage(e){
    let data =e.currentTarget.dataset ;
    console.log(data);
    wx.navigateTo({
      url: '../receive/receive?column=' + data.column + "&name=" + data.name + "&url=" + data.url
    });
  },
  toOther(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.page
    });
  }
})