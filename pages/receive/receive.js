const app = getApp();
Page({
  data: {
    listData: [],
    maxl: 25,
    loadNum: 6
  },
  onLoad: function (options) {
    console.log(options);
    let c = options.column||'3';
     this.setData({
         column:"column" + c ,
         'options':options ,
         url: app.globalData.api[options.url],
         imgServer: app.globalData.imgServer
     });
     wx.setNavigationBarTitle({
       title: options.name || '出错了!'
     });
     wx.setNavigationBarColor({
       frontColor: '#000000',
       backgroundColor: '#fafafa'
     });
  },
  onReady: function () {
    this.loadMore = this.selectComponent("#loadMore");
    if(app.globalData.userInfo){
      this.loadMore.loading();
    }
    else{
      app.login(this.loadMore.loading);
    }  
  },
  loadData(e) {
    console.log(e);
    let that = this;
    let arr = this.data.listData;
    if (e.detail.result.data.data.length == 0){
      this.loadMore.loadAll();
    }
    arr = arr.concat(e.detail.result.data.data);
    this.setData({
      listData:arr
    });
  }
})