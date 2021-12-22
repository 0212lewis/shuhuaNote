// pages/displayRecord/displayRecord.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { id } = options
        this.getDetail(id)
    },

    async getDetail(id) {
        wx.showLoading({
          title: '请稍后...',
        })
        const res = await wx.cloud.callFunction({
            name:'serviceFunctions',
            data: {
                type: 'getRecordDetail',
                id
            }
        })
        if (res.result.success) {
            this.setData({
                content: res.result.data
            })
        }
        wx.hideLoading()
    }
})