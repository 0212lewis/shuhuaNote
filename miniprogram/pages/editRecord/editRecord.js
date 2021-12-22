// pages/editRecord/editRecord.js
import dayjs from 'dayjs'
const weekDayMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
const chooseLocation = requirePlugin('chooseLocation')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        date: '',
        title: '',
        location: '',
        content: '',
        weather: '',
        text: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const weekDayIndex = dayjs(new Date()).day()
        const { createTime, content, title, weather, location, _id, text } = JSON.parse(decodeURIComponent(options.record))
        wx.showLoading({ title: '加载中...' })
        setTimeout(() => {
            const commonEditor = this.selectComponent('#common-editor')
            commonEditor.editorCtx.setContents({ html: content })
            this.setData({
                id: _id,title,weather,location,content,text,
                date: dayjs(createTime).format('YYYY-MM-DD') + "(" + weekDayMap[weekDayIndex] + ")",
            })
            wx.hideLoading()
        }, 500)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const lo = chooseLocation.getLocation()
        lo && lo.hasOwnProperty('name') && this.setData({
            location: lo.name
        })
    },

    async submit() {
        const { title, content, weather, location, text, id } = this.data
        if (!title) return wx.showToast({
            icon: "none",
            title: '请输入标题!',
        })
        if (!content) return wx.showToast({
            icon: "none",
            title: '请输入正文内容!',
          })
        wx.showLoading()
        const res = await wx.cloud.callFunction({
            name: 'serviceFunctions',
            data: {
                type: 'updateRecord',
                id: id,
                params: {
                    content, title, weather, location, text,
                    updateTime: new Date().getTime()
                }
            }
        })
        if (!res.result || !res.result.success){
            wx.hideLoading()
            return wx.showToast({
                title: '修改失败!',
                icon: 'error',
                duration: 1000
              })
        }
        wx.showToast({
            title: '修改成功!',
            icon: 'success',
            duration: 1000,
            success: function () {
                wx.hideLoading()
                setTimeout(() => {
                    wx.switchTab({ url: '../noteRecord/noteRecord' })
                }, 1000)
            }
        })

    },

    reset: function() {
        const commonEditor = this.selectComponent('#common-editor')
        commonEditor.editorCtx.setContents({
            html: ''
          })
        this.setData({
            title: '',
            location: '',
            text: '',
            content: '',
            weather: ''
        })
    },

    onEditorInput(e) {
        const {detail} = e
        const textTrim = detail.detail.text.replace(/[\r\n]/g,"").replace(/\ +/g,"")
        this.setData({
            content: detail.detail.html,
            text: textTrim
        })
    },

    onTitleChange(e) {
        this.setData({
            title: e.detail
        })
    },

    onChooseLocation(e) {
        this.setData({
            location: e.detail
        })
    },
    onChooseWeather(e) {
        this.setData({
            weather: e.detail
        })
    }
})