// pages/displayRecord/displayRecord.js
import dayjs from 'dayjs'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        content: '',
        weather: '',
        createTime: '',

        scrollViewHeight: 0
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
                title: "《" +res.result.data.title+ "》",
                content: res.result.data.content,
                weather: res.result.data.weather,
                createTime: dayjs(res.result.data.createTime).format('YYYY-MM-DD')
            },() => {
                this.calculateScrollHeight()
            })
        }
        wx.hideLoading()
    },

    calculateScrollHeight() {
        const that = this
        wx.getSystemInfo({
            success: (result) => {
                let titleHeight= 0
                let tagHeight = 0
                wx.createSelectorQuery().select('.title').boundingClientRect().exec(rect=> {
                    console.log(rect[0].height)
                    titleHeight = rect[0].height
                })
                wx.createSelectorQuery().select('.tag').boundingClientRect().exec(rect=> {
                    tagHeight = rect[0].height
                    that.setData({
                        scrollViewHeight: result.windowHeight - titleHeight - tagHeight - 50 
                    })
                })
                
            },
          })
    }
})