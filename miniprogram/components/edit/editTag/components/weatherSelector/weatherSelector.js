// components/edit/editTag/weatherSelector/weatherSelector.js
import { weatherMap } from './weatherMap'
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
        weatherMap: weatherMap,
        selected: null
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onSelect(e) {
            const { value } = e.currentTarget.dataset
            if (this.data.selected  && this.data.selected.value === value.value) {
                return this.setData({
                    selected: null
                }, () => {
                    this.triggerEvent('onSelectWeather', '')
                })
            }
            this.setData({
                selected: value
            }, () => {
                this.triggerEvent('onSelectWeather', this.data.selected.value)
            })
        }
    }
})
