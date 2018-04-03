
Page({
  data: {
    listData: [{ imgsrc: "http://dev.guotu.zsylife.cn/minidata/index01.png", name: "撒建档立卡数据的上的", time: "3月20日", title: "萨达d按时" }, { imgsrc: "http://dev.guotu.zsylife.cn/minidata/index01.png", name: "撒上的", time: "3月20日", title: "萨达d按时" }, { imgsrc: "http://dev.guotu.zsylife.cn/minidata/index01.png", name: "撒上的", time: "3月20日", title: "萨达d按时" }, { imgsrc: "http://dev.guotu.zsylife.cn/minidata/index01.png", name: "撒上的", time: "3月20日", title: "萨达d按时" }, { imgsrc: "http://dev.guotu.zsylife.cn/minidata/index01.png", name: "撒上的", time: "3月20日", title: "萨达d按时" }, { imgsrc: "http://dev.guotu.zsylife.cn/minidata/index01.png", name: "撒上的", time: "3月20日", title: "萨达d按时" }],
    maxl: 25,
    loadNum: 6
  },
  onLoad: function (options) {
   
    let c = options.column||'3';
     this.setData({
         column:"column" + c ,
         'options':options
     });
     wx.setNavigationBarTitle({
       title: options.name || '出错了!'
     });
     wx.setNavigationBarColor({
       frontColor: '#000000',
       backgroundColor: '#fafafa'
     });
     console.log(this.data.options);
  },
  onReady: function () {
    this.loadMore = this.selectComponent("#loadMore");
  },
  loadData() {
    let that = this;
    let arr = this.data.listData;
    for (let i = 0; i < that.data.loadNum; i++) {
      if (arr.length > that.data.maxl) {
        that.loadMore.loadAll();
        break
      }
      arr.push({
        imgsrc: 'http://dev.guotu.zsylife.cn/minidata/index02.png',
        name:'是打开了大',
        time: '3月20日',
        title: "大卖场内"
      });
    }
    that.setData({
      listData: arr
    });
    that.loadMore.loaded();
  }
})