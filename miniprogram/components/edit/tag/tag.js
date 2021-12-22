// pages/edit/components/tag/tag.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        icon: {
            type: String,
            value: ''
        },
        text: {
            type: String,
            value: ''
        },
        borderRadius: {
            type: Boolean,
            value: true
        },
        fontSize: {
            type: String,
            value: '14px'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap () {
            this.triggerEvent('onClick')
        }
    }
})
