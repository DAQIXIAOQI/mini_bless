import fullfix from '../behavior/fixedToggle.js';
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
          this.setData({
            status:'got'
          });
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
    }
  }
});
