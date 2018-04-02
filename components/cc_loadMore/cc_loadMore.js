// components/cc_loadMore/cc_loadMore.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoading:false,
    isLoadAll:false
  },

  methods: {
    loading(){
      if(this.data.isLoadAll) return ;
      this.setData({
         isLoading:true
      });
      this.triggerEvent("loadData",{});
    },
    loadAll(){
     
      this.setData({
         isLoading:false,
         isLoadAll:true
      });
    },
    loaded(){
      this.setData({
         isLoading:false
      });
    }
  }
})
