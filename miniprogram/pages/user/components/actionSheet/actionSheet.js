// pages/user/components/actionSheet/actionSheet.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        helpVisible: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showHelp: function() {
            this.setData({
                helpVisible: true
            })
        }
    }
})
