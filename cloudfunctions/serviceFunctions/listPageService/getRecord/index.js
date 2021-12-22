const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {
    const { filterOptions, openId } = event
    let params = {
        _openid: openId
    }
    if (filterOptions && filterOptions.keyword){
        params.title = db.RegExp({
            regexp: filterOptions.keyword,
            options: 'i'
        })
    }
    if (filterOptions && filterOptions.chooseDate){
        const [start, end] = filterOptions.chooseDate
        params.createTime = db.command.gte(start) && db.command.lte(end)
    }
    try{
        const res =  await db.collection('record').orderBy('createTime','desc').where(params).get()
        return {
            success: true, 
            data: res.data,
            msg: '数据获取成功！'
        }
    } catch(e) {
        return {
            success: false, 
            msg: '数据获取失败！'
        }
    }
}