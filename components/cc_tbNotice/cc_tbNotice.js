// components/cc_tbNotice/cc_tbNotice.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
          position:{
            type:String,
            value:"top"
          },
          text:{
            type:String,
            value:"没有填入值"
          },
          iconPath:{
            type:String,
            value:""
          },
          color: { type: String, value: "#ffffff" }, 
          bgcolor: { type: String, value: "#000000" },
          automove:{type:Boolean,value:true}
  },
  ready(){
    let that = this ;
    if(this.data.automove){
    let b = new Promise(function(resolve,reject){
      let textW , scrollW ;
      let query = wx.createSelectorQuery().in(that)
      query.select('#text').boundingClientRect(function (res) { 
          textW=res.width; 
      }).exec();
      let query1 = wx.createSelectorQuery().in(that)
      query1.select('#scroll-box').boundingClientRect(function (res) {
          scrollW=res.width;
          resolve([textW, scrollW]);
      }).exec();
    });
    b.then(function(e){
      if(e[0]<e[1]){
        return
      }
      else{
        that.setData({
          dvalue:parseInt(e[0]- e[1])+20
        },that.move);
      }         
    });
    }
  }
  ,
  data: {
    timerInterval:"",
    timerTimeout:"",
    moveD:{
      ratio:0,
      dir:true
    }
  },
  methods: {
    move(){
      if(!this.data.automove||!this.data.dvalue) return 
      let that = this ;
      this.stop();
      this.data.timerInterval = setInterval(function(){
        that.cul();
      },30);
    },
    cul(){
      let moveD = this.data.moveD;
      let dvalue = this.data.dvalue;
      if(moveD.dir){
        if(moveD.ratio >= dvalue){
          this.setData({
             moveD:{
              "ratio":dvalue,
              "dir":false
             }
          });
          return
        }
        this.setData({
          moveD: {
            "ratio": moveD.ratio+1,
            "dir":true
          }
         });
      }else{
        if (moveD.ratio <= -20) {
          this.setData({
            moveD: {
              "ratio": -20,
              "dir": true
            }
          });
          return
        }
        this.setData({
          moveD: {
            "ratio": moveD.ratio - 1,
            "dir": false
          }
        });
      }
    }
    ,
    stop(){
      if (!this.data.automove || !this.data.dvalue) return 
      clearTimeout(this.data.timerTimeout);
      clearInterval(this.data.timerInterval);
      this.setData({
        moveD: {
          ratio: 0,
          dir: true
        }
      });
    }
  }
})
