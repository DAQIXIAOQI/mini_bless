const app = getApp()
Component({
  properties: {
    text:{
      type:String,
      value:'发送'
    },
    url:{
      type:String,
      value:''
    },
    "type":{
      type:String,
      value:'get'
    },
    data:{
      type:Object,
      value:{}
    },
    globalval:{
      type:String,
      value:''
    },
    cid:{
      type:String,
      value:""
    }
  },
  data: {
    isAble:false
  },
  ready(){
    if(this.data.url){
      this.setData({
        isAble:true
      })
    }
  }
  ,
  methods: {
   click(){
      let that = this ;
      if(this.checkNull()){
        wx.request({
          url: this.data.url,
          method:this.data.type,
          data:this.data.data,
          success(e){
              console.log(e);
              that.triggerEvent('ajaxback',{result:e});
          },
          fail(e){
            that.triggerEvent('ajaxback', { result: e });
            wx.showToast({
              title: '请求失败，请稍后再试~！',
              icon: 'none'
            })
          }
        })
      }
   },
   checkNull(){
     let globalData = app.globalData[this.data.globalval];
      for(let name in globalData){
          console.log(globalData[name]);
          if(globalData[name].value == ''){
               wx.showToast({
                 title: globalData[name].cname+'必填',
                 icon:'none'
               })
               return false
          }
          else{
            console.log(this.data.data);
            this.data.data[globalData[name].name] = globalData[name].value;
          }
      }
      return true
   }
  }
})
