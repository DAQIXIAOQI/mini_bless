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

      title: "排行榜"

    });
    wx.setNavigationBarColor({

      frontColor: '#ffffff',

      backgroundColor: '#f0695b'

    });
  },
  onReady: function () {    
     this.loadData();
     
     
  },
  loadData(){
      let that = this ;
      let arr = this.data.listData;
      let rank = arr.length ;
      if (this.data.loadAll) return;
      that.setData({ isLoading: true });
      for (let i = 0; i < that.data.loadNum; i++) {
        if (arr.length > that.data.maxl) {
          that.setData({ loadAll: true,isLoading:false })
          break
        }
        arr.push({
          avatar: 'http://dev.guotu.zsylife.cn/minidata/index02.png',
          name: '大家阿卡~!',
          num: i,
          rank:rank + i
        });
      }
      that.setData({
        isLoading: false,
        listData: arr
      });
    
  }
  ,
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})