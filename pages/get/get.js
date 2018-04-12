const app = getApp()
Page({
  data: {
    imgUrls: ['http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png']  ,
    commentList:[],
    isShowComment:false,
    ismoving:false,
    isLike:false,
    isLogin:false,
    comment:''
  },
  onLoad: function (options) {
    let that = this;
    if (!app.globalData.userInfo) {
      app.login(function () { that.setData({ isLogin: true, userInfo: app.globalData.userInfo }); });
    }
    else{
      that.setData({ isLogin: true, userInfo: app.globalData.userInfo });
    }
  },

  onReady: function () {
    this.commentLoad = this.selectComponent("#commentLoad");
    this.commentBox = this.selectComponent("#_comment");
    this.commentLoad.loading();
    this.slide = this.selectComponent("#slide");
  },
  
  loadComment(e) {
    let arr = this.data.commentList;
    arr = arr.concat(e.detail.result);
    this.setData({
      commentList:arr
    });
  },
  toggleComment(){
    let that = this ;
    this.setData({
      ismoving:true
    });
    setTimeout(function(){
      that.setData({
        isShowComment: !that.data.isShowComment
      });
    },1000);
    setTimeout(function(){
      that.setData({ismoving:false});
    },2500);
  
   
  },
  toggleLike(){
    let that = this ;
    this.setData({
      isLike:!that.data.isLike
    });
  },
  toPage(){
     wx.switchTab({
       url: '/pages/index/index',
     })
  },
  submitComment(){
    let that = this ;
    let comment = {
      avatar:this.data.userInfo.avatarUrl,
      name: this.data.userInfo.nickName,
      time: (new Date().getMonth()) + 1 + '月' + (new Date().getDate()) + '日',
      comment:this.data.comment
    }
    if(this.data.comment == ''){
      wx.showToast({
        title: '不能提交空值',
        icon:'none'
      });
      return
    }
    let arr = this.data.commentList;
    arr.unshift(comment);
    this.setData({ commentList:arr,comment:''});
    this.commentBox.clear();
    wx.showModal({
      title: '恭喜',
      content: '提交成功！去查看留言？',
      cancelText:'不了',
      confirmText:'好的',
      success(res){
        if(res.confirm){
        that.toggleComment();
        }
      }
    });

  },
  commentInput(e){
     this.setData({
       comment : e.detail.value
     });
  }
})