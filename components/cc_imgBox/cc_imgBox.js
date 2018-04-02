// components/cc_imgBox/cc_imgBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
       src:{
         type:String,
         value:''
       },
       preview:{
         type:Boolean,
         value:false
       }
  },
  data: {
       isLoad:false
  },
  ready(){
    
  }
  ,
  methods: {
    
       load(){
         this.setData({
           isLoad: true
         })
       },
       tap(){
         if(this.data.preview){
         wx.previewImage({
           urls:[this.data.src]
         })
         }
       }
     
  }
})
