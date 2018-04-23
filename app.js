//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: false,
    baseServer: "http://dev.mini.zsylife.cn",
    imgServer: "http://dev.mini.zsylife.cn/data/upload/"
  },
  /*登录*/
  login(succ,fail) {
    var code, encryptedData, iv;
    var that = this;
    //先判断用户登陆是否过期
    wx.checkSession({
      success() {
        console.log('登录态未过期');
        wx.getStorage({
          key: '3rd_session',
          success: function (res) {
            const rd = res.data;
            if (!res.data) {
              that.loginIn(succ,fail);
              return
            }
            wx.request({
              url: that.globalData.baseServer + "/index.php/api/bless/user_info",
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              data: { '3rd_session': rd },
              success(res) {
                if (!res.data.status) {
                  that.loginIn(succ, fail);
                  return
                }
                that.globalData.userInfo = res.data.data;
                that.globalData.userInfo['3rd_session'] = rd;
                that.globalData.ajaxPublic = {
                  '3rd_session': rd,
                  'uid': res.data.data.id
                };
                if(succ) succ();
                that.check();
              },
              fail(res) { console.log(res) }
            })
          },
          fail(res) {
            console.log('登陆态未过期，3rd_session本地获取失败',res);
            that.loginIn(succ, fail);
          }
        });
      },
      fail() {
        console.log('无登录态');
        that.loginIn(succ, fail);
      }
    });
  },
  loginIn(succ,fail) {
    var code;
    var that = this;
    wx.login({
      success(res) {
        code = res.code;
        wx.getUserInfo({
          success: function (res) { 
            var $data = {
              "code": code,
              "nickname": res.userInfo.nickName,
              'gender': res.userInfo.gender,
              'city': res.userInfo.city,
              'province': res.userInfo.province,
              'country': res.userInfo.country,
              'avatarurl': res.userInfo.avatarUrl,
              'language':res.userInfo.language
            }
            that.globalData.userInfo = $data;
           
            wx.request({
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              url: that.globalData.baseServer + '/index.php/api/bless/login',
              data: $data,
              dataType: 'json',
              success: function (res) {
                wx.setStorage({
                  key: '3rd_session',
                  data: res.data.data["3rd_session"],
                  success(res){
                    console.log('setStorageSuccess');
                    that.check();
                  }
                });
                that.globalData.userInfo['3rd_session'] = res.data.data["3rd_session"];
                that.globalData.userInfo['id'] = res.data.data["id"];
                that.globalData.ajaxPublic = {
                  '3rd_session': res.data.data["3rd_session"],
                  'uid': res.data.data["id"]
                };
                if(succ) succ();
              },
              fail: function (res) {
                console.log(2, res);
                if(fail) fail();
              }
            });
          },
          fail: function () {
            console.log('用户不授权');
          }
        });
      },
      fail(){
        wx.showModal({
          title: 'login fail',
          content: '',
        })
      }
    });
  },
  check(){
    console.log("nocheck");
    return
    const that = this;
    console.log(that.globalData);
    wx.request({
      url: that.globalData.baseServer + "/index.php/api/bless/blessings_comment_list",
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'uid': that.globalData.userInfo['id'],
        '3rd_session': that.globalData.userInfo['3rd_session'],
        'bid':'28'
        //'p': '1',
        //'wid': '2',

        // 'sid': '1',
        // 'tid': '0',
        // 'avatarurl':'das',
        // 'nickname':'dsadsa',
        // 'receiver':'dsa',
        // 'content':'416546'
      },
      success(re){
        console.log(re);
      },
      fail(re){
        console.log(re);
      }
    })
  },
  //封装了过期时间的本地缓存
  setStorage($obj){
    const $data  = {
      data: $obj.data,
      creatTime: (new Date()).getTime(),
      deadline: $obj.deadline
    }
    wx.setStorage({
      key: $obj.key,
      data: $data,
      success(res){
        if($obj.success) $obj.success() ;
      },
      fail(res){
        if ($obj.fail) $obj.fail() ;
      }
    });
  },
  getStorage($obj){
      wx.getStorage({
        key: $obj.key,
        success(res){
          const nowTime = (new Date()).getTime();
          if (nowTime - res.data.creatTime < res.data.deadline * 60 * 1000){
            if ($obj.success) $obj.success(res.data.data);
          }
          else{
            if ($obj.fail) $obj.fail('参数已过期');
          }
        },
        fail(res){
          if($obj.fail) $obj.fail('未找到参数');
        }
      });
  }
})