// components/cc_redPacket/cc_redPacket.js
let toggle = require('../behavior/fixedToggle');
Component({
  behaviors:[toggle],
  properties: {
      '_type':{
        type:String,
        value:'redPacket'
      },
      title:{
        type:String,
        value:'默认'
      }
  },
  data: {
    mValue:'',
    mNum:'',
    mTotal:'0.00'
  },
  attached(){
    if(this.data._type == 'cartPacket'){
      this.setData({
        mNum:'饰品'
      });
    }
  }
  ,
  methods: {
    cmoney(e){
      this.setData({
         mValue:e.detail.value ,
         mTotal: parseFloat(e.detail.value).toFixed(2)
      }); 
    },
    cnum(e){
      console.log(e);
      this.setData({
        mNum: e.detail.value
      }); 
    },
    submit(){
      if(this.data.mValue == "" || this.data.mNum == "") return ;
      this.toggle();
      this.triggerEvent('submit',{'type':this.data._type,value:this.data.mValue,num:this.data.mNum});
    }
  }
})
