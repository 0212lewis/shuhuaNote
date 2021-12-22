const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {
    const { id } = event
    console.log(event)
    try{
        const res =  await db.collection('record').doc(id).remove()
        if (res.stats && res.stats.removed) return {
            success: true,
            msg: '删除成功!'
        }
        return {
            success: true,
            msg: '删除失败!'
        }
    } catch(e) {
        return {
            success: false, 
            msg: '删除失败!'
        }
    }
}