const app = getApp();
Page({

  data: {
     listData:[],
  },

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
    if(!app.globalData.userInfo){
      app.login(this.getRank);
    }
    else{
      this.getRank();
    }
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
  },
  getRank(){
    const that = this ;
    wx.request({
      url: app.globalData.baseServer + '/index.php/api/bless/blessings_rank',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      dataType: 'json',
      data: app.globalData.ajaxPublic,
      success(res) {
        let list = res.data.data.ranks;
        for (let i = 0; i < list.length ; i++){
          list[i].rank = i + 1 ;
        }
        console.log(list);
        that.setData({
          listData: list,
          my_rank: res.data.data.my_rank || 'no get',
        });
        
      },
      fail(res) {
        console.log(res);
      }
    }) 
  }
})