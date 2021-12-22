// custom-tab-bar/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [
            {
                name: "record",
                pagePath: '../noteRecord/noteRecord',
                icon: 'wap-home-o',
                selected: true,
                text: '记录墙'
            },
            {
                name: "edit",
                pagePath: '../edit/edit',
                icon: 'edit',
                selected: false,
                text: '写日记'
            },
            {
                name: "user",
                pagePath: '../user/user',
                icon: 'user-o',
                selected: false,
                text: '我的'
            }
        ],
        active: 'record'
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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

    },

    switchTab(e) {
        const { detail } = e
        const selected = this.data.list.filter(item => item.name === detail)[0]
        if (!selected) return
        const url = selected.pagePath
        wx.switchTab({url})
      }
})