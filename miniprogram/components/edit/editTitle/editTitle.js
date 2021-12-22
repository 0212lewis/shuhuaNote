// components/edit/editTitle/editTitle.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        text: {
            type: String,
            value: ''
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
        onTitleChange(e) {
            const { detail } = e
            this.triggerEvent("onTitleChange", detail)
        }
    }
})
