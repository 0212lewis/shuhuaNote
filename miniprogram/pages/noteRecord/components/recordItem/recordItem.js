// pages/noteRecord/components/recordItem/recordItem.js
const app = getApp()
import {
    WEATHER_ENUM
} from '../../../../utils/consts'
Component({
    lifetimes: {
        attached() {
            const { text } = this.properties.record
            this.setData({
                displayText: text.length > 80 ?  text.substring(0,80) + '...' : text.substring(0,80)
            })
        },
    },
    /**
     * 组件的属性列表
     */
    properties: {
        record: {
            type: Object,
            value: {}
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        weatherMap: WEATHER_ENUM,
        displayText: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        update() {
            const newRecord = {
                ...this.properties.record,
                ...{
                    content: '333333'
                }
            }
            wx.cloud.callFunction({
                name: 'serviceFunctions',
                data: {
                    type: 'updateRecord',
                    id: this.properties.record._id,
                    data: newRecord
                }
            }).then(res => {
                if (!res || !res.result) return
            })
        },
        editItem() {
            wx.navigateTo({
                url: '/pages/editRecord/editRecord?record=' + encodeURIComponent(JSON.stringify(this.properties.record)),
            })
        },
        deleteRecord() {
            wx.showModal({
                title: '删除提醒',
                content: '确认删除该篇笔记',
                success: async () => {
                    const res = await wx.cloud.callFunction({
                        name: 'serviceFunctions',
                        data: {
                            type: 'deleteRecord',
                            id: this.data.record._id
                        }
                    })
                    console.log(res)
                }
            })
        },
        displayDetail() {
            wx.navigateTo({
              url: '/pages/displayRecord/displayRecord?id=' + this.data.record._id,
            })
        }
    }
})