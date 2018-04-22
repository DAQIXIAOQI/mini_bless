// pages/remind/remind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remindList:[
      {
        'type':'comment',
        avatar:'http://dev.guotu.zsylife.cn/minidata/index01.png',
        name:"小明",
        time:"4月17日",
        comment:"谢谢你的祝福！",
        resource:"祝你们身体健康~！"
      },
      {
        'type': 'like',
        avatar: 'http://dev.guotu.zsylife.cn/minidata/index01.png',
        name: "小葱",
        time: "4月17日",
        resource: "祝你们身体健康~！"
      },
      {
        'type': 'comment',
        avatar: 'http://dev.guotu.zsylife.cn/minidata/index01.png',
        name: "大仙",
        time: "4月17日",
        comment: "谢谢你的祝福！",
        resource: "祝你们身体健康~！"
      },
      {
        'type': 'like',
        avatar: 'http://dev.guotu.zsylife.cn/minidata/index01.png',
        name: "狐狸",
        time: "4月17日",
        resource: "祝你们身体健康~！"
      },
    ]
  },
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})