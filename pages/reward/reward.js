// pages/reward/reward.js
Page({
  data: {
    current:0,
    tabs: ['待领取','已领取','已过期'],
    bg: ["../../images/reward-wait.png", "../../images/reward-got.png", "../../images/reward-dead.png"],
    rewardList:[
      [{
        size:1024,
        deadline:'2018.5.25',
        time:'4月20日'
      }, {
        size: 512,
        deadline: '2018.5.25',
        time: '4月20日'
      }],
      [],
      [{
        size: 512,
        deadline: '2018.4.20',
        time: '4月15日'
      }]
    ]
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
  },
  toggle(e){
    this.setData({
      current: e.currentTarget.dataset.index
    });
  },
  tabsInit(){
    let width = parseInt(100 / this.data.tabs.length);
    this.setData({
      tabsWidth: width
    });
  }
})