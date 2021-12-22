// app.js
App({
  onLaunch: function () {
    this.globalData = {};
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        traceUser: true,
      });
    }
    this.getUser()
  },

  globalData: {
    checkUser: false,
    openId: '',
    nickname: '',
    avatar: ''
  },

  getUser: function() {
    const that = this
    wx.cloud.callFunction({
      name: 'serviceFunctions',
      data: {
        type: 'getUserInfo'
      }
    }).then(res => {
      if (res.result.success) {
        const {
          nickname,
          avatar,
          _openid
        } = res.result.userInfo
        this.globalData.openId = _openid
        this.globalData.nickname = nickname
        this.globalData.avatar = avatar
      }
      that.globalData.checkUser = true
      if (that.checkUserCallback) {
        that.checkUserCallback()
      }
    })
  }
});