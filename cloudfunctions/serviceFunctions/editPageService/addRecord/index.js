const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (events, context) => {
    const { payload } = events
    const { OPENID } = cloud.getWXContext()
    try {
        const res = await db.collection('record').add({
            data: {
                ...payload,
                _openid: OPENID
            }
        })
        if (res._id) return { success: true, msg: '添加成功！' }
        return {
            success: false,
            msg: '新增失败!'
        }
    } catch(e) {
        return {
            success: false,
            msg: '新增失败,请检查网络环境！'
        }
    }
}