// components/cc_cartA/cc_cartA.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: String,
      value: ''
    },
    imgh: {
      type: String,
      value: 1
    },
    maintext: {
      type: String,
      value: ''
    },
    lefttext: {
      type: String,
      value: ''
    },
    righttext: {
      type: String,
      value: ''
    },
    mark: {
      type: String,
      value: ''
    },
    imgsrc: {
      type: String,
      value: ''
    },
    cid:{
      type:String,
      value:""
    },
    title:{
      type:String,
      value:''
    }
  },
  data: {

  },
  ready() {
    if (this.data.width) {
      let v = this.data.width.match(/(\d+(\.\d+)?)/)[0];
      let u = this.data.width.match(/([a-zA-Z]+)/)[0];   
      let temp = {
        value: parseFloat(v) * parseFloat(this.data.imgh),
        unit: u
      }
      this.setData(
        { imgh: temp.value + temp.unit }
      );
    }
  },
  methods: {
    tap() {
      this.triggerEvent('callback', { 'mark': this.data.mark });
    }
  }
})
