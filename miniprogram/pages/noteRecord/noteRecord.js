// pages/noteRecord/noteRecord.js
import dayjs from 'dayjs'
const app = getApp()
const weekDayMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
Page({
    /**
     * 页面的初始数据
     */
    data: {
        data: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        if (app.globalData.checkUser) {
            this.getData()
        } else {
            app.checkUserCallback = _ => {
                this.getData()
            }
        }
    },
    onShow: function () {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                active: 'record'
            })
        }
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: async function () {
        wx.showNavigationBarLoading({
            title: '刷新中...'
        })
        await this.getData()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
    },

    async onFilter(e) {
        const { detail } = e
        this.getData(detail)
    },
    async getData(filterOptions) {
        if (!app.globalData.openId) return
        wx.showLoading({
            title: '正在获取信息...',
        })
        const res = await wx.cloud.callFunction({
            name: 'serviceFunctions',
            data: {
                type: 'getRecord',
                openId: app.globalData.openId,
                filterOptions
            }
        })
        if (!res.result || !res.result.success) return wx.hideLoading()
        this.setData({
            data: res.result.data.map(item => {
                return ({
                    ...item,
                    ...{
                        createTime: dayjs(item.createTime).format('YYYY-MM-DD')
                    },
                    ...{
                        weekday: weekDayMap[dayjs(item.createTime).day()]
                    }
                })
            })
        },() => {
            wx.hideLoading()
        })
    }
})