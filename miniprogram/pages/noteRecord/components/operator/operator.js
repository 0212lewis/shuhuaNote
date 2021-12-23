const dayjs = require("dayjs")

// pages/noteRecord/components/operator/operator.js
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
        show: false,
        keyword: '',
        chooseDate: null,
        minDate: new Date('2021-12-09').getTime(),
        maxDate: new Date().getTime()
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showDatePicker() {
            this.setData({
                show: true
            })
        },
        onSearch (e) {
            this.setData({
                keyword: e.detail
            },() => {
                const { keyword, chooseDate } = this.data
                this.triggerEvent('onFilter', { keyword, chooseDate })
            })
        },
        onReset() {
            this.setData({
                show: false,
                chooseDate: null,
                minDate: new Date('2021-12-09').getTime(),
                maxDate: new Date().getTime()
            }, () => {
                const { keyword, chooseDate } = this.data
                this.triggerEvent('onFilter', { keyword, chooseDate })
            })
        },
        onClose() {
            this.setData({
                show: false
            })
        },
        onConfirm(e) {
            const [start, end] = e.detail
            this.setData({
                chooseDate: [new Date(start).getTime(), new Date(end).getTime() + 24*60*60*1000],
                show: false
            }, () => {
                const { keyword, chooseDate } = this.data
                this.triggerEvent('onFilter', { keyword, chooseDate })
            })
        }
    }
})
