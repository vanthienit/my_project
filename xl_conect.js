var MongoClient = require('mongodb').MongoClient;
var dbConnection = function () {
    var db = null
    var instance = 0
    async function dbConnect() {
        try {
            var url =`mongodb://my_database:thienvan123@ds153460.mlab.com:53460/my_javascript`
            var _db = await MongoClient.connect(url)
            return _db.db(`my_javascript`)
        } catch (loi) {
            return loi
        }
    }
    async function get(){
        try {
            instance++
            console.log('số lượng gọi đến kết nối '+ instance+' lần')
            if(db!=null){
                console.log(`kết nối CSDL đã tồn tại`)
                return db
            }else{
                console.log(` tạo 1 kết nối CSDL mới`)
                db= await dbConnect()
            return db
            }
        } catch (error) {
            return error
        }
    }
    return {get:get}
}
module.exports = dbConnection();