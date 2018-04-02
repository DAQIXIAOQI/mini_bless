// components/cc_fullTabsList/cc_fullTabsList.js
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
    isShow :false,
    tabData: [{ text: '项目', id: 0 }, { text: '项目', id: 1 }, { text: '项目', id: 2 }, { text: '项目', id: 3 }, { text: '项目', id: 4 }, { text: '项目', id: 5 }, { text: '项目', id:6 }, { text: '项目', id: 7 }],
    listData:{
      0: { title: '项目', id: 0, data: [{ text: ' bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。', tid: 0 }, { text: ' bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。', tid: 0 }, { text: ' bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。', tid: 0 }, { text: ' bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。', tid: 0 }, { text: ' bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。', tid: 0 }]}
    },
    nowList:{}
  },
  ready(){
    this.setData({
      nowList:this.data.listData[0]
    });
  }
  ,
  methods: {
    toggle(){
      this.setData({
        isShow:!this.data.isShow
      });
    },
    tabClick(e){
      console.log(e, !this.data.listData[e.currentTarget.dataset.id]);
      if (!this.data.listData[e.currentTarget.dataset.id]){
        let temp = { title: '项目', id: e.currentTarget.dataset.id, data: [{ text: ' bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。', tid: 0 }, { text: ' bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。', tid: 0 }, { text: ' bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。', tid: 0 }, { text: ' bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。', tid: 0 }, { text: ' bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。bilibili是国内知名的视频弹幕网站,这里有最及时的动漫新番,最棒的ACG氛围,最有创意的Up主。', tid: 0 }] }     
       let list = this.data.listData;
       list[e.currentTarget.dataset.id] = temp ;     
        this.setData({
          listData:list
        },function(){
          this.setData({
            'nowList': this.data.listData[e.currentTarget.dataset.id]
          });
        });
        return
      }
      else{
        console.log(this.data.listData);
        this.setData({
          'nowList': this.data.listData[e.currentTarget.dataset.id]
        });
      }

        
    },
    sendText(e){
       this.triggerEvent('receive',{source:'fulist',text:e.currentTarget.dataset.text});
       this.toggle();
    }
    ,
    close(){
      this.triggerEvent('close', { source: 'fulist'});
      this.toggle();
    }
  }
})
