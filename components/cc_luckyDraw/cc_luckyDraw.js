import fullfix from '../behavior/fixedToggle.js';
const app = getApp();
Component({
  behaviors:[fullfix],
  properties: {
      bid:{
        type:String
      }
  },
  data: {
    isWatch: false,
    moveOut: false,
    moveIn:false,
    isWin:false
  },
  methods: {
    watch(){
      const $data = Object.assign(app.globalData.ajaxPublic, { bid: this.data.bid });
      const that = this;
      wx.request({
        url: app.globalData.baseServer + app.globalData.api.fluxActive,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: $data,
        method: 'POST',
        dataType: 'json',
        success(res) {
          console.log(res);
          if(res.data.status){
            that.setData({
              spec: res.data.data.spec
            });
            that.ctoggle(true);
          }
          else{
            that.ctoggle(false);
          }
        },
        fail(res) {
          that.ctoggle(false);
        }
      });
     
    },
    stopScroll(e){
      return
    },
    ctoggle(v){
      const win = v ;
 if(this.data.isWatch) return 
      const that = this;
      this.setData({
        moveOut:true
      });
      setTimeout(function(){
        that.setData({
          moveOut: false,
          moveIn:true,
          isWatch:true,
          isWin:v,
        });
      },900);
    }
  }
})
