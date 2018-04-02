// components/cc_redPacket/cc_redPacket.js
let toggle = require('../behavior/fixedToggle');
Component({
  behaviors:[toggle],
  properties: {

  },
  data: {
    mValue:'',
    mNum:'',
    mTotal:'0.00'
  },
  ready(){

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
      this.toggle();
    }
  }
})
