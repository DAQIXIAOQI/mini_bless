// components/cc_inlineAbstract/cc_inlineAbstract.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      imgsrc:{
        type:String,
        value:''
      },
      text:{
        type:String,
        value:'text'
      },
      cid:{
        type:String,
        value:''
      },
      mark:{type:String,value:''},
      imgw:{
        type:String,
        value:""
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tap(){
      this.triggerEvent('callback',{mark:this.data.mark});
    }
  }
})
