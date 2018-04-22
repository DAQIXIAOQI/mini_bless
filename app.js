//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: false,
    baseServer: "http://dev.mini.zsylife.cn",
  },
  /*登录*/
  login() {
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
              that.loginIn();
              return
            }
            wx.request({
              url: that.globalData.baseServer + "/index.php/api/bless/user_info",
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              data: { '3rd_session': rd },
              success(res) {
                if (!res.data.status) {
                  that.loginIn();
                  return
                }
                that.globalData.userInfo = res.data.data;
                that.globalData.userInfo['3rd_session'] = rd;
                console.log(that.globalData);
                that.check();
              },
              fail(res) { console.log(res) }
            })
          },
          fail() {
            console.log('登陆态未过期，3rd_session本地获取失败');
            that.loginIn();
          }
        });
      },
      fail() {
        console.log('无登录态');
        that.loginIn();
      }
    });
  },
  loginIn() {
    var code;
    var that = this;
    wx.login({
      success(res) {
        code = res.code;
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo;
            var $data = {
              "code": code,
              "nickName": res.userInfo.nickName,
              'gender': res.userInfo.gender,
              'city': res.userInfo.city,
              'province': res.userInfo.province,
              'country': res.userInfo.country,
              'avatarUrl': res.userInfo.avatarUrl,
              'language':res.userInfo.language
            }
            wx.request({
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              url: that.globalData.baseServer + '/index.php/api/bless/login',
              data: $data,
              dataType: 'json',
              success: function (res) {
                console.log(res);
                wx.setStorage({
                  key: '3rd_session',
                  data: res.data.data["3rd_session"],
                  success(){
                    console.log('setStorageSuccess');
                    that.check();
                  }
                });
                that.globalData.userInfo['3rd_session'] = res.data.data["3rd_session"];
                that.globalData.userInfo['uid'] = res.data.data["id"];
              },
              fail: function (res) {
                console.log(2, res);
              }
            });
          },
          fail: function () {
            console.log('用户不授权');
          }
        });
      }
    });
  },
  check(){
    const that = this;
    console.log(that.globalData);
    wx.request({
      url: that.globalData.baseServer + "/index.php/api/bless/notice_count",
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        'uid': that.globalData.userInfo['id'],
        '3rd_session': that.globalData.userInfo['3rd_session'],
        'p': '3',
        //'wid': '2',

        // 'sid': '1',
        // 'tid': '0',
        // 'avatarUrl':'das',
        // 'nickName':'dsadsa',
        // 'receiver':'dsa',
        'content':'416546'
      },
      success(re){
        console.log(re);
      },
      fail(re){
        console.log(re);
      }
    })
  }
})