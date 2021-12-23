const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (events, context) => {
    const { id } = events
    try{
        const res = await db.collection('record').doc(id).get()
        return {
            success: true,
            data: {
                content: res.data.content,
                title: res.data.title,
                weather: res.data.weather,
                createTime: res.data.createTime
            },
            msg: '获取成功！'
        }
    } catch(e) {
        return {
            success: false,
            data: null,
            msg: '获取失败！'
        }
    }
}