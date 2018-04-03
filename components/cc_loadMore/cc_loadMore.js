// components/cc_loadMore/cc_loadMore.js
Component({
  properties: {

  },
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
