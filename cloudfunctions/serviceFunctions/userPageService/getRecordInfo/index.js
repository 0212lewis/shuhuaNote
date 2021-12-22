const dayjs = require('dayjs')
const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (events, context) => {
    const { OPENID } = cloud.getWXContext()
    try {
        let dayNum, noteNum, wordsNum = 0
        let set = new Set()
        const res = await db.collection('record').where({
            _openid: OPENID
        }).get()
        if (!res || !res.data) return {
            success: false,
            msg:'数据获取失败'
        }
        noteNum = res.data.length
        res.data.forEach(item => {
            wordsNum = wordsNum + item.text.length
            set.add(dayjs(item.createTime).format('YYYY-MM-DD'))
        })
        dayNum = set.size
        return {
            success: true,
            data: {
                dayNum,
                noteNum,
                wordsNum
            },
            msg: '数据获取成功'
        }
    } catch (e) {
        console.log(e)
        return {
            success: false,
            msg: '服务出错啦！'
        }
    }
}