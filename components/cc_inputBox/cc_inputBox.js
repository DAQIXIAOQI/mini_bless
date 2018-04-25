const app = getApp()
Component({
  properties: {
   
    name: {
      type: String,
      value: ''
    },
    cname: {
      type: String,
      value: ''
    },
    isrequire: {
      type: Boolean,
      value: false
    },
    setglobal: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: ''
    },
    maxlength: {
      type: Number,
      value: -1
    },
    notice: {
      type: String,
      value: ''
    },
    height:{
      type:String,
      value:''
    },
    single:{
      type:Boolean,
      value:true
    },
    clear:{
      type:Boolean,
      value:true
    },
    cid:{
      type:String,
      value:""
    }
  },
  data: {

  },
  ready(){  
       if(this.data.value != ""){
       this.input(this.data.value);
       }
       else{
         console.log(app.globalData[this.data.setglobal]);
         if (!app.globalData[this.data.setglobal] || !app.globalData[this.data.setglobal][this.data.name]){
           this.input("");
         }
       }
  }
  ,
  methods: {
    input(e) {
      let that = this ;
      let value = (e.detail ? e.detail.value : e);
      if(!this.checkLength(value)) {
        wx.showToast({
          title: '输入过长，只能显示'+that.data.maxlength+'个字符',
          icon: 'none',
          duration: 1000
        })
        value = value.slice(0,that.data.maxlength);
      }
      if(this.data.setglobal){
      if (app.globalData[this.data.setglobal] && app.globalData[this.data.setglobal][this.data.setglobal]) {
        app.globalData[this.data.setglobal][this.data.name].value = value;
      }
      else {
        if (!app.globalData[this.data.setglobal]){
          app.globalData[this.data.setglobal] = {};
        }   
        let obj = this.data;
        obj.value = value;
        app.globalData[this.data.setglobal][this.data.name] = obj;  
      }
      }
      this.setData({"value":value});
      this.triggerEvent('input',{'value':value});
    },
    clear() {
      this.setData({
        value: ''
      });
      this.input("");
    },
    checkLength(e){
     
      if (this.data.maxlength == -1 || e.length < this.data.maxlength ){ 
         return true
       }
       else{
         return false
       }
    }
  }
})
