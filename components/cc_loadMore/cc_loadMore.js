// components/cc_loadMore/cc_loadMore.js
Component({
  properties: {
    url: {
      type: String,
      value: ''
    },
    data: {
      type: Object,
      value: {}
    },
    test: {
      type: String,
      value: false
    },
    method: {
      type: String,
      value: 'GET'
    },
    maxl: {
      type: Number,
      value: 50
    },
    num: {
      type: Number,
      value: 6
    }
  },
  data: {
    isLoading: false,
    isLoadAll: false,
    /*test data*/
    index: 0
  },

  methods: {
    loading() {
      
      if (this.data.isLoadAll) return;
      let that = this;
      this.setData({
        isLoading: true
      });
      //是否为测试环境
      if (!that.data.test) {
        wx.request({
          url: that.data.url,
          data: that.data.data,
          method: that.data.method,
          success(e) {
            that.triggerEvent("loadData", { result: e });
            that.loaded();
          },
          fail(e) {
            console.log("request failed");
            that.triggerEvent("loadData", { result: e });
            that.loaded();
          }
        });
      }
      else {
        let that = this;
        let arr = [];
        for (let i = 0; i < that.data.num; i++) {
          if (that.data.index >= that.data.maxl) {
            this.loadAll();
            break
          }
          arr.push({
            avatar: 'http://dev.guotu.zsylife.cn/minidata/index02.png',
            name: '大家阿卡~!',
            num: that.data.maxl - that.data.index,
            rank: that.data.index,
            imgsrc: 'http://dev.guotu.zsylife.cn/minidata/index02.png',
            title: "大卖场内",
            time: '3月27日', 
            comment: '的哈就是看的哈就开始大哭的哈空间', 
          });
          this.setData({
            index: that.data.index + 1
          });
        }
        that.triggerEvent("loadData", { result: arr });
        this.loaded();
      }
    },
    loadAll() {
      this.setData({
        isLoading: false,
        isLoadAll: true
      });
    },
    loaded() {
      this.setData({
        isLoading: false
      });
    }
  }
})
