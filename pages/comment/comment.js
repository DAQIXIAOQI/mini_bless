const app = getApp();
Page({

  data: {
    p:1,
    commentList:[],
  },
  onLoad: function (options) {
    this.setData({
      bdata:{'bid':options.id},
      url: app.globalData.api.blessComment
    });
  },
  onReady: function () {
    this.commentLoad = this.selectComponent("#loadMore");
    if(!app.globalData.userInfo){
      app.login(this.commentLoad.loading);
    }
    else{
      this.commentLoad.loading();
    }
  },
  getComment(e){
    console.log(e);
    let arr = this.data.commentList;
    let data = e.detail.result.data.data.list;
    if (data.length == 0) {
      this.commentLoad.loadAll();
    }
    arr = arr.concat(data);
    this.setData({
      commentList: arr
    });
  }
})