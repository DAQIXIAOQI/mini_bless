Component({
  properties: {
     lefttext:{
       type:String,
       value:'按钮'
     },
     righttext:{
       type:String,
       value:'按钮'
     },
     imgsrc:{
       type:String,
       value:''
     },
     imgW:{
       type:String,
       value:''
     },
     imgh:{
       type:String,
       value:'1'
     },
     bgsrc:{
       type:String,
       value:''
     },
     height:{
       type:String,
       value:''
     }
  },
  data: {

  },
  ready(){
    if (this.data.imgW) {
      let nr = /(\d+)([a-zA-Z]+)/g.exec(this.data.imgW);
      let temp = {
        value: parseInt(nr[1]) * parseFloat(this.data.imgh),
        unit: nr[2]
      }
      this.setData(
        { imgh: temp.value + temp.unit }
      );
     
    }
  }
  ,
  methods: {
     lefttap(){
       this.triggerEvent('leftclick');
     },
     righttap(){
       this.triggerEvent('rightclick');
     }
  }
})
