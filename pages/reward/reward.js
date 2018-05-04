const app = getApp();
Page({
  data: {
    current:0,
    tabs: ['待领取','已领取','已过期'],
    bg: ["../../images/reward-wait.png", "../../images/reward-got.png", "../../images/reward-dead.png"],
    rewardList:[[],[],[]]
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "我的奖品"
    });
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#fafafa'
    });
  },
  onReady: function () {
    this.tabsInit();
    this.exchange = this.selectComponent("#exchange");
    app.login(this.getData);
  },
  getData(){
    if(this.data.rewardList[this.data.current].length != 0) return;
    const $data = Object.assign(app.globalData.ajaxPublic,{status:this.data.current});
    const that = this;
    wx.request({
      url: app.globalData.baseServer + app.globalData.api.fluxCoupons,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: $data,
      method: 'POST',
      dataType: 'json',
      success(res){
        const data = res.data.data;
        for(let x in data){
          data[x].endtime = that.format(data[x].endtime);
          data[x].createtime = that.format(data[x].createtime);
        }
        const list = that.data.rewardList;
        list[that.data.current] = data ;
        that.setData({
          rewardList:list
        });
      }, 
      fail(res) {
        console.log(res);
      }
    });
  }
  ,
  toggle(e){
    this.setData({
      current: e.currentTarget.dataset.index
    },this.getData);
  },
  tabsInit(){
    let width = parseInt(100 / this.data.tabs.length);
    this.setData({
      tabsWidth: width
    });
  },
  get(e){
    if(this.data.current != 0) return ;
    this.exchange.setValue(e.currentTarget.dataset);
    this.exchange.toggle();
  },
  format(val){
    const reg = /(\d{4})-(\d{2})-(\d{2})/;
    val = val.match(reg);
    return (val[1]+'年'+val[2]+'月'+val[3]+'日')
  },
  clear(e){
    this.setData({
      rewardList:[[],[],[]]
    },this.getData);
    
  }
})