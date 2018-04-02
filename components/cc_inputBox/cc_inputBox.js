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
    }
  },
  data: {

  },
  ready(){  
       this.input(this.data.value);
  }
  ,
  methods: {
    input(e) {
      let value = (e.detail ? e.detail.value : e);
      if(!this.checkLength(value)) {
        wx.showToast({
          title: '选择的模板长度过长~！',
          icon: 'none',
          duration: 1000
        })
        return
      }
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
      this.setData({"value":value})
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
