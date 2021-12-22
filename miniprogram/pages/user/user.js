const dayjs = require("dayjs")

const app = getApp()
// pages/user/user.js
Page({
    data: {
        username: null,
        avatar: null,
        dayNum: 0,
        noteNum: 0,
        wordsNum: 0
    },

    onReady: async function() {
        const { nickname, avatar, openId } = app.globalData
        if (!openId) return
        this.setData({
            username: nickname, avatar
        }, () => {
            this.getRecordInfo()
        })
    },

    onShow: function() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                active: 'user'
            })
        }
    },
    login: function () {
        const self = this
        wx.getUserProfile({
          desc: '申请获取您的用户信息',
          success: async function(res) {
              wx.showLoading({
                title: '登录中...',
              })
              const { nickName, avatarUrl } = res.userInfo
              const result = await wx.cloud.callFunction({
                  name: 'serviceFunctions',
                  data: {
                      type: 'login',
                      nickname: nickName,
                      avatar: avatarUrl,
                      loginTime: dayjs(new Date()).format('YYYY-MM-DD')
                  }
              })
              if(!result.result.success) return
              self.setData({
                  username: nickName,
                  avatar:avatarUrl
              }, async () => {
                  await self.getRecordInfo()
                  app.globalData.nickname = nickName,
                  app.globalData.avatar = avatarUrl,
                  app.globalData.openId = result.result.openId
                  wx.hideLoading()
              })
          }
        })
    },

    getRecordInfo: async function() {
        try{
            const res = await wx.cloud.callFunction({
                name: 'serviceFunctions',
                data: {
                    type: 'getRecordInfo'
                }
            })
            if (!res.result.success) return wx.showToast({
              title: '信息获取失败!',
              icon: 'error'
            })
            const { noteNum, wordsNum, dayNum } = res.result.data
            this.setData({ noteNum, wordsNum, dayNum })
        } catch(e) {
            console.log(e)
        }
    }
    
})