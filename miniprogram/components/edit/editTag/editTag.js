// components/edit/editTag/editTag.js
const chooseLocation = requirePlugin('chooseLocation')
Component({
    pageLifetimes: {
        show() {
            const lo = chooseLocation.getLocation()
            lo && lo.hasOwnProperty('name') && this.triggerEvent('onChooseLocation', lo.name)
        }
    },
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        weatherModalVisible: false,
        selectedWeather: null
    },

    /**
     * 组件的方法列表
     */
    methods: {
        chooseAddress() {
            wx.getLocation({
                type: 'wgs84',
                success(res) {
                    const key = 'UDDBZ-NQKKU-SBWV6-BONA6-JAHU6-VHFHN'; //使用在腾讯位置服务申请的key
                    const referer = '淑华随笔'; //调用插件的app的名称
                    const location = JSON.stringify({
                        latitude:  res.latitude,
                        longitude: res.longitude
                    }); 
                    const category = '工具,备忘录';
                    wx.navigateTo({
                        url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
                    })
                }
               })
        },

        chooseWeather(e) {
            this.setData({
                weatherModalVisible: true
            })
        },

        onSelectWeather(e) {
            this.setData({
                selectedWeather: e.detail
            })
        },

        onClose() {
            this.setData({ weatherModalVisible: false })
        },
        onConfirm() {
            this.triggerEvent('onChooseWeather', this.data.selectedWeather)
            this.setData({ weatherModalVisible: false })
        }
    }
})