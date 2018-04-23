const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabShow:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow :false,
    listData:{
    },
    nowList:{

    },
   
  },
  ready(){
    const that = this;
    wx.request({
      url: app.globalData.baseServer + '/index.php/api/bless/bless_template',
      method: 'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded' ,
      },
      data: {
        'uid': app.globalData.userInfo['id'],
        '3rd_session': app.globalData.userInfo['3rd_session'],
      },
      success(res){
        console.log(res);
        that.setData({
          nowList: res.data
        });
      },
      fail(res) { 
        that.setData({
          isError:true
        }); 
      }
    })
  }
  ,
  methods: {
    toggle(){
      this.setData({
        isShow:!this.data.isShow
      });
    },
    sendText(e){
      this.triggerEvent('receive', { source: 'fulist', text: e.currentTarget.dataset.text, tid: e.currentTarget.dataset.tid});
       this.toggle();
    },
    close(){
      this.triggerEvent('close', { source: 'fulist'});
      this.toggle();
    }
  }
})
