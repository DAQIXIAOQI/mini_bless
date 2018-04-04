let interval = {};
Component({

  properties: {
         imgurl:{
           type:Array,
           value:[]
         }
  },
  data: {
    sid:'A1',
    itemWidth:74
  },
  attached(){
    let that = this ;
    this.setData({
       width:this.data.imgurl.length*this.data.itemWidth + 'vw'
    });
    interval.length = this.data.imgurl.length;
    interval.dir = true;
    interval.timer = '';
    interval.timer1 = '';
    interval.nowPos = 1 ;
    interval.check = function(){
        if(this.nowPos >= this.length){
            this.dir = false;
            this.nowPos = this.length - 1 ;
        }
        else if(this.nowPos < 0){
            this.dir = true ;
            this.nowPos = 0 ;
        }   
    };
    interval.stoggle = function(){
      if (this.dir) {
        this.nowPos += 1;
        this.check();
      }
      else {
        this.nowPos -= 1;
        this.check();
      }
      that.setData({
        sid: 'A' + this.nowPos
      });   
    }
    this.interval();
  }
  ,
  methods: {
    interval(){
      let that = this;     
      clearInterval(interval.timer);
      interval.timer = setInterval(function(){
            this.stoggle();
      }.bind(interval),5000);
    },
    touchstart(e){
      interval.nowPos = e.currentTarget.dataset.index ;
      clearInterval(interval.timer);
      clearTimeout(interval.timer1);
      interval.timer1 = setTimeout(function(){
            this.interval();
      }.bind(this),3000);
    },
    tap(e){
      this.setData({
        sid: 'A' + e.currentTarget.dataset.index
      })
    }

  }
})
