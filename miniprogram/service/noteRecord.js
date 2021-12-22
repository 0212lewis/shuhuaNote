const db = wx.cloud.database()
const collection = db.collection('record')
export async function getAllRecord () {
    return await collection.get()
}