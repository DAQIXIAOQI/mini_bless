
Page({
  data: {
    listData: [],
    maxl: 25,
    loadNum: 6
  },
  onLoad: function (options) {
   
    let c = options.column||'3';
     this.setData({
         column:"column" + c ,
         'options':options
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
    this.loadMore.loading();
  },
  loadData(e) {
    console.log(e);
    let that = this;
    let arr = this.data.listData;
    arr = arr.concat(e.detail.result);
    this.setData({
      listData:arr
    });
  }
})