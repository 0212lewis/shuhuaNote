// pages/edit/components/imageSelector/imageSelector.js
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
        uploaderList: [],
        uploaderNum:0,
        showUpload:true
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 删除图片
        clearImg: function (e) {
            var nowList = []; //新数据
            var uploaderList = this.data.uploaderList; //原数据

            for (let i = 0; i < uploaderList.length; i++) {
                if (i == e.currentTarget.dataset.index) {
                    continue;
                } else {
                    nowList.push(uploaderList[i])
                }
            }
            this.setData({
                uploaderNum: this.data.uploaderNum - 1,
                uploaderList: nowList,
                showUpload: true
            })
        },
        //展示图片
        showImg: function (e) {
            var that = this;
            wx.previewImage({
                urls: that.data.uploaderList,
                current: that.data.uploaderList[e.currentTarget.dataset.index]
            })
        },
        //选择上传
        upload: function (e) {
            var that = this;
            wx.chooseImage({
                count: 3 - that.data.uploaderNum,
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    let tempFilePaths = res.tempFilePaths;
                    let uploaderList = that.data.uploaderList.concat(tempFilePaths);
                    if (uploaderList.length == 3) {
                        that.setData({
                            showUpload: false
                        })
                    }
                    that.setData({
                        uploaderList: uploaderList,
                        uploaderNum: uploaderList.length,
                    })
                }
            })
        },
    }
})