// pages/noteRecord/noteRecord.js
import dayjs from 'dayjs'
const app = getApp()
const weekDayMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
Page({
    /**
     * 页面的初始数据
     */
    data: {
        data: [],
        pageNum: 1,
        filterOptions: null,
        hasMore: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        if (app.globalData.checkUser) {
            this.getData()
        } else {
            app.checkUserCallback = _ => {
                this.getData()
            }
        }
    },
    onShow() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                active: 'record'
            })
        }
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        wx.showNavigationBarLoading({
            title: '刷新中...'
        })
        this.setData({
            pageNum: 1
        }, async () => {
            await this.getData()
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
        })
    },

    async onReachBottom() {
        const {
            pageNum,
            hasMore,
            data
        } = this.data
        if (!hasMore) return
        this.setData({
            pageNum: pageNum + 1
        }, () => {
            this.getData(data)
        })
    },

    async onFilter(e) {
        const {
            detail
        } = e
        this.setData({
            filterOptions: detail,
            pageNum: 1
        }, () => {
            this.getData()
        })
    },
    async getData(arr) {
        if (!app.globalData.openId) return
        const {
            pageNum,
            filterOptions
        } = this.data
        arr || wx.showLoading({
            title: '正在获取信息...',
        })
        const res = await wx.cloud.callFunction({
            name: 'serviceFunctions',
            data: {
                type: 'getRecord',
                openId: app.globalData.openId,
                filterOptions,
                pageNum,
                pageSize: 5
            }
        })
        if (!res.result || !res.result.success) return wx.hideLoading()
        const newList = res.result.data.list.map(item => ({
            ...item,
            ...{text: item.text.substring(0, 80)},
            ...{
                createTime: dayjs(item.createTime).format('YYYY-MM-DD')
            },
            ...{
                weekday: weekDayMap[dayjs(item.createTime).day()]
            }
        }))
        wx.hideLoading()
        this.setData({
            data: arr ? arr.concat(newList) : newList,
            hasMore: res.result.data.hasMore
        })
    }
})