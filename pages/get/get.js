// pages/get/get.js
Page({
  data: {
    imgUrls: ['http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png', 'http://dev.guotu.zsylife.cn/minidata/index01.png']  ,
    commentList:[
      { name: '大师', time: '3月27日', comment: '的哈就是看的哈就开始大哭的哈空间', avatar: 'http://dev.guotu.zsylife.cn/minidata/index01.png' }, { name: '大师', time: '3月27日', comment: '的哈就是看的哈就开始大哭的哈空间', avatar: 'http://dev.guotu.zsylife.cn/minidata/index01.png' }, { name: '大师', time: '3月27日', comment: '的哈就是看的哈就开始大哭的哈空间', avatar: 'http://dev.guotu.zsylife.cn/minidata/index01.png' }, { name: '大师', time: '3月27日', comment: '的哈就是看的哈就开始大哭的哈空间', avatar: 'http://dev.guotu.zsylife.cn/minidata/index01.png' }, { name: '大师', time: '3月27日', comment: '的哈就是看的哈就开始大哭的哈空间', avatar: 'http://dev.guotu.zsylife.cn/minidata/index01.png' }
    ],
    maxl: 25,
    loadNum: 6,
    isShowComment:false,
    ismoving:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.commentLoad = this.selectComponent("#commentLoad");
  },
  loadComment() {
    let that = this;
    let arr = this.data.commentList;
    for (let i = 0; i < that.data.loadNum; i++) {
      if (arr.length > that.data.maxl) {
        that.commentLoad.loadAll();
        break
      }
      arr.push({
        imgsrc: 'http://dev.guotu.zsylife.cn/minidata/index02.png',
        name: '是打开了大',
        time: '3月20日',
        comment:"电视剧啊圣诞节了极大见识到了空间啊大家里看到"
      });
    }
    that.setData({
      commentList: arr
    });
    that.commentLoad.loaded();
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
  
   
  }
})