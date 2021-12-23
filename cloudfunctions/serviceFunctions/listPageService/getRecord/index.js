const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {
    const { filterOptions, openId, pageSize, pageNum } = event
    const _ = db.command
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
        params.createTime = _.and(_.gte(start), _.lte(end))
    }
    try{
        const countRes = await db.collection('record').where(params).count()
        const totalPage = Math.ceil(countRes.total / pageSize)
        let hasMore = true
        if (pageNum >= totalPage) {
            hasMore = false
        }
        console.log(params)
        const res =  await db.collection('record').where(params).skip((pageNum - 1) * pageSize).limit(pageSize).orderBy('createTime','desc').get()
        return {
            success: true, 
            data: {
                list: res.data,
                hasMore: hasMore
            },
            msg: '数据获取成功！'
        }
    } catch(e) {
        return {
            success: false, 
            msg: '数据获取失败！'
        }
    }
}