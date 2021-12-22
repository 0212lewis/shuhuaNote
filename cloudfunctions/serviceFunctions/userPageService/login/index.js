const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {
    const { OPENID } = cloud.getWXContext()
    const { nickname, avatar, loginTime } = event
    try{
        const res = await db.collection('user').add({
            data: {
                _openid: OPENID,
                nickname,
                avatar,
                loginTime
            }
        })
        if (res._id) return { success: true, openId: OPENID, msg: '登录成功!' }
        return {
            success: false,
            msg: '登录错误！'
        }
    } catch(e) {
        return {
            success: false,
            msg: '登录错误！'
        }
    }
}