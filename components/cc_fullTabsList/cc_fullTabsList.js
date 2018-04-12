// components/cc_fullTabsList/cc_fullTabsList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabShow:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow :false,
    tabData: [{ text: '项目', id: 0 }, { text: '项目', id: 1 }, { text: '项目', id: 2 }, { text: '项目', id: 3 }, { text: '项目', id: 4 }, { text: '项目', id: 5 }, { text: '项目', id:6 }, { text: '项目', id: 7 }],
    listData:{
      0: { title: '项目', id: 0, data: [{ text: '报不完的恩，是母亲的恩。还不了的情，是母亲的情。谢不了的爱，是母亲的爱。表达不了的真诚心，依然是浓浓的母爱情。母亲节，只有真诚地祝福，愿母亲永远健康，快乐常伴！', tid: 0 }, { text: '有一种爱不求回报，有一种爱大公无私，有一种爱奉献到老，有一种爱无怨无悔，这是伟大的母爱。母亲节到了，祝天下母亲幸福、快乐、健康！', tid: 0 }, { text: '妈妈的爱是一首最深情的爱的乐章，为我弹奏出最动人最灿烂最圣洁的乐曲.这种爱融于平淡如水的生活中，以其无微不至的关怀和呵护抵御人世间的春寒秋冷，一直伴我成长。母亲节到了，愿亲爱的母亲节日快乐！', tid: 0 }, { text: '您的艰辛，让我学会珍惜；您的勤奋，让我读懂努力；您用尽责，让我敢于担当；您的冷静，让我学会观察；您的宽容，让我知道博大；您的笑颜，让我得到快乐；您的仁爱，让我变得善良。母亲节到了，谢谢您让我心里充满阳光，祝福您幸福万年长！', tid: 0 }, { text: '您的艰辛，让我学会珍惜；您的勤奋，让我读懂努力；您用尽责，让我敢于担当；您的冷静，让我学会观察；您的宽容，让我知道博大；您的笑颜，让我得到快乐；您的仁爱，让我变得善良。母亲节到了，谢谢您让我心里充满阳光，祝福您幸福万年长！', tid: 0 }, { text: '母爱是加法，岁月渐增，关怀渐增；母爱是乘法，距离越长，牵挂越长；母爱是减法，减去自己，呵护我们；母爱是除法，除了儿女，还是儿女。加减乘除算不尽您的爱，阴晴冷暖，远近聚散，无时无处不弥漫。母亲节，祝亲爱的妈妈身体康健，快乐平安！', tid: 0 }, { text: '轻轻地拨通电话，诉说无尽的想念；静静地发个短信，传递深深的祝愿；深深地说一句“谢谢”，一句问候浓缩了所有的感恩，一份思念携带了所有的深情，一个节日包含了所有的祝福，母亲节，轻轻地道一声：妈妈，节日快乐！', tid: 0 }, { text: '岁月染白了您的黑发，沧桑雕琢了您的脸颊，光阴折射了您的年华，时光书写了您的无价，夕阳下您等我归家，幽灯下您满是牵挂，晨曦里您开始洗刷，一生中您支撑着家。母亲节到了，愿您永远快乐安康！', tid: 0 }, { text: '念母恩，比海深；今生情，无以报；母亲节，表心声；愿母亲，永年轻；精神好，气色正；身体好，无病疾；心情好，无烦忧；享幸福，笑开颜！', tid: 0 }]}
    },
    nowList:{},
   
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
