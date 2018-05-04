import fullfix from '../behavior/fixedToggle.js';
const app = getApp();
Component({
  behaviors: [fullfix],
  properties: {
    title:{
      type:String
    },
    value:{
      type:String
    }
  },
  data: {
    status:'wait'
  },
  methods: {
    submit(e){
      console.log(e);
      const val = e.detail.value.phone;
      if(val == ""){
        wx.showToast({
          title: '请输入你的手机号码！',
          icon:'none'
        })
      }
      else{
        if(!this.checkPhone(val)){
          wx.showToast({
            title: '请输入正确的手机号码！',
            icon: 'none'
          })
        }
        else{
          //接request
          const $data = Object.assign(app.globalData.ajaxPublic, { fid: this.data.fid,mobile:val });
          const that = this;
          wx.request({
            url: app.globalData.baseServer + app.globalData.api.fluxRecharge,
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: $data,
            method: 'POST',
            dataType: 'json',
            success(res) {
             if(res.data.status){
             that.setData({
               status: 'got',
               phone:val
             },function(){
               that.triggerEvent("success");
             });
             }
             else{
               that.setData({
                 status: 'fail'
               });
             }
            },
            fail(res) {
              console.log(res);
              that.setData({
                status: 'fail'
              });
            }
          })
         
        }
      }
    },
    checkPhone(val){
      if (!(/^1[34578]\d{9}$/.test(val)))  {
          return false;
      } 
      return true;
    },
    reset(){
      this.setData({
        status: 'wait'
      });
    },
    setValue(obj){
      this.setData(obj);
    }
  }
});
