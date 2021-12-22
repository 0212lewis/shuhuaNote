const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {
    const { OPENID } = cloud.getWXContext()
    try {
        const res = await db.collection('user').where({ _openid: OPENID }).get()
        if (!res.data || res.data.length ===0) return { success: false }
        return {
            success: true,
            userInfo: res.data[0]
        }
    } catch (e) {
        return {
            success: false
        }
    }
}