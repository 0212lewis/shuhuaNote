// 云函数入口文件
const cloud = require('wx-server-sdk')
const getRecord = require('./listPageService/getRecord/index')
const addRecord = require('./editPageService/addRecord/index')
const updateRecord = require('./editPageService/updateRecord/index')
const login = require('./userPageService/login/index')
const getUserInfo = require('./userPageService/getUserInfo/index')
const getRecordInfo = require('./userPageService/getRecordInfo/index')
const getRecordDetail = require('./getRecordDetail/index')
const deleteRecord = require('./listPageService/deleteRecord/index')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.type) {
        case 'getRecord':
            return await getRecord.main(event, context)
        case 'addRecord':
            return await addRecord.main(event, context)
        case 'updateRecord':
            return await updateRecord.main(event, context)
        case 'getUserInfo':
            return await getUserInfo.main(event, context)
        case 'getRecordInfo':
            return await getRecordInfo.main(event, context)
        case 'login':
            return await login.main(event, context)
        case 'getRecordDetail':
            return await getRecordDetail.main(event, context)
        case 'deleteRecord':
            return await deleteRecord.main(event, context)
    }
}