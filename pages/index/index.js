const app = getApp()

Page({
  data: {},
  onLoad: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#f0695b'
    });
    this.setData({
      imgServer:app.globalData.imgServer
    });
  },
  onReady(){
    if (!app.globalData.userInfo) {
      app.login(this.setList,(res)=>{   
      });
    }
    else{
      this.setList(); 
    }
    
  },
  toPage(e) {
    wx.navigateTo({
      url: '../edit/edit?id=' + e.currentTarget.dataset.id + '&resource=index',
    })
  },
  setList() {
    const that = this;
    app.getStorage({
      key: 'styleList',
      success(res){
        that.setData({
          listData: res,
        });
      },
      fail(res){
          wx.request({
          url: app.globalData.baseServer + '/index.php/api/bless/bless_style',
          method:'POST',
          header:{
            'content-type': 'application/x-www-form-urlencoded'
          },
          data:{
            'uid': app.globalData.userInfo['id'],
            '3rd_session': app.globalData.userInfo['3rd_session'],
          },
          success(res){
            app.setStorage({
              key: 'styleList',
              data: res.data.data,
              deadline: 5
            });
            that.setData({
              listData: res.data.data
            });
          },
          fail(res){
            wx.showModal({
              title: '出错了!',
              content: '服务器开小差了，请尝试刷新或过段时间再进入。',
              showCancel:false
            })
          }
        })
      }
    });


    // wx.getStorage({
    //   key: 'styleList',
    //   success(res) {
    //     that.setData({
    //       listData: res.data
    //     });
    //   },
    //   fail(){
    //     wx.request({
    //       url: app.globalData.baseServer + '/index.php/api/bless/bless_style',
    //       method:'POST',
    //       header:{
    //         'content-type': 'application/x-www-form-urlencoded'
    //       },
    //       data:{
    //         'uid': app.globalData.userInfo['id'],
    //         '3rd_session': app.globalData.userInfo['3rd_session'],
    //       },
    //       success(res){
    //         console.log(res);
    //         wx.setStorage({
    //           key: 'styleList',
    //           data: res.data,
    //         });
    //       },
    //       fail(res){
    //         wx.showModal({
    //           title: '出错了!',
    //           content: '服务器开小差了，请尝试刷新或过段时间再进入。',
    //           showCancel:false
    //         })
    //       }
    //     })
    //   }
    // })
  }
})
