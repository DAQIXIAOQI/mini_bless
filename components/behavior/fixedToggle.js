module.exports = Behavior({
  behaviors: [],
  properties: {
  },
  data: {
    isShow:false
  },
  methods: {
    toggle(){
      this.setData({
     isShow:!this.data.isShow
      });
    },
    close() {
      this.triggerEvent('close');
      this.setData({
        isShow: false
      });
      if(this.reset){
        this.reset();
      }
    },
    stopScroll(e) {
      return
    }
  }
})