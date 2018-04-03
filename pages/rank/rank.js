// pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     listData:[],
     loadAll:false,
     isLoading:false,
     maxl:100,
     loadNum:6
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({

      title: "获赞排行榜"

    });
    wx.setNavigationBarColor({

      frontColor: '#ffffff',

      backgroundColor: '#f0695b'

    });
  },
  onReady: function () {    
     this.loadMore = this.selectComponent("#loadMore");
     this.loadData();
  },
  loadData(){
      let that = this ;
      let arr = this.data.listData;
      let rank = arr.length ;
      for (let i = 0; i < that.data.loadNum; i++) {
        if (arr.length > that.data.maxl) {
          this.loadMore.loadAll();
          break
        }
        arr.push({
          avatar: 'http://dev.guotu.zsylife.cn/minidata/index02.png',
          name: '大家阿卡~!',
          num: that.data.maxl-rank-i,
          rank:rank + i
        });
      }
      this.loadMore.loaded();
      that.setData({
        listData: arr
      });
    
  },
  r(){
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  showRule(){
     wx.showModal({
       title: '排名规则',
       content: '这是规则规则这是规则规则这是规则规则这是规则规则这是规则规则这是规则规则这是规则规则这是规则规则这是规则规则这是规则规则这是规则规则',
       showCancel:false,
       confirmText:'知道了'
     })
  }
  
})