const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { id, params } = event
  try {
    const res = await db.collection('record').doc(id).update({
      data: {...params}
    })
    if (res.stats && res.stats.updated) return {
      success: true,
      msg: '更新成功！'
    }
    return {
      success: false,
      msg: '更新失败！'
    }
  } catch (e) {
    return {
      success: false,
      msg: '更新失败！'
    }
  }
}