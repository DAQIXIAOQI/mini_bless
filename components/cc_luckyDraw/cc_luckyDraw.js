import fullfix from '../behavior/fixedToggle.js';
Component({
  behaviors:[fullfix],
  properties: {

  },
  data: {
    isWatch: false,
    moveOut: false,
    moveIn:false,
    isWin:false
  },
  methods: {
    watch(){
      if(this.data.isWatch) return 
      const that = this;
      this.setData({
        moveOut:true
      });
      setTimeout(function(){
        that.setData({
          moveOut: false,
          moveIn:true,
          isWatch:true
        });
      },900);
    },
    stopScroll(e){
      return
    }
  }
})
