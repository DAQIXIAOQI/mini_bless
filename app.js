//app.js
App({
  onLaunch: function () {
     this.login();
  },
  globalData: {
    userInfo: false,
    baseServer: "https://mini.zsylife.cn/",
  },
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
            console.log(res.data);
            if (!res.data) {
              that.loginIn();
              return
            }
            wx.request({
              url: that.globalData.baseServer + "/index.php/Api/Wechatprogram/wxusers",
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              data: { '3rd_session': res.data },
              success(res) {
                console.log(res, res.data.status);
                if (!res.data.status) {
                  that.loginIn();
                  return
                }
                that.globalData.userInfo = res.data.data;
                console.log('success get userInfo:', res.data.data);
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
              "nickname": res.userInfo.nickName,
              'gender': res.userInfo.gender,
              'city': res.userInfo.city,
              'province': res.userInfo.province,
              'country': res.userInfo.country,
              'avatarurl': res.userInfo.avatarUrl
            }
            wx.request({
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              url: that.globalData.baseServer + '/index.php/Api/Wechatprogram/wxlogin',
              data: $data,
              dataType: 'json',
              success: function (res) {
                console.log(res);
                wx.setStorage({
                  key: '3rd_session',
                  data: res.data["3rd_session"],
                  success() {
                    console.log('setStorageSuccess');
                  }
                });
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
  }
})