var File = require('fs')
var thu_muc_pdf = "tap_tin"

var dbConnection = require('../xu_ly/xl_conect')

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
    if (matches.length != 3) {
        return new Error('Lỗi...')
    }
    response.type = matches[1]
    response.data = new Buffer(matches[2], 'base64')
    return response
}
class xl_luu_tru {
    doc_thong_tin_dich_vu() {
        var chuoi_html = ""
        var duong_dan = "index.html"
        if (File.existsSync(duong_dan))
            chuoi_html = File.readFileSync(duong_dan)
        return chuoi_html
    }
    ghi_file_pdf(ten, chuoi_nhi_phan) {
        var kq = "ok"
        try {
            var nhi_phan = decodeBase64Image(chuoi_nhi_phan)
            var duong_dan = thu_muc_pdf + "//" + ten
            File.writeFileSync(duong_dan, nhi_phan.data)
        } catch (loi) {
            kq = loi.toString()
        }
        return kq
    }
    async doc_thong_tin_cua_hang() {
        try {
            var db = await dbConnection.get()
            var cua_hang = await db.collection("cua_hang").find({}).toArray()
            return cua_hang
        } catch (loi) {
            console.log(loi)
        }
    }
    async doc_thong_tin_nguoi_dung() {
        try {
            var db = await dbConnection.get()
            var nguoi_dung = await db.collection("nguoi_dung").find({}).toArray()
            return nguoi_dung
        } catch (loi) {
            console.log(loi)
        }
    }
    async doc_thong_tin_dien_thoai() {
        try {
            var db = await dbConnection.get()
            var dien_thoai = await db.collection("dien_thoai").find({}).toArray()
            return dien_thoai
        } catch (loi) {
            console.log(loi)
        }
    }
    async doc_danh_sach_thanh_ly() {
        try {
            var db = await dbConnection.get()
            var thanh_ly = await db.collection("thanh_ly").find({}).toArray()
            return thanh_ly
        } catch (loi) {
            console.log(loi)
        }
    }
    async ghi_moi_doi_tuong(loai_dt, dt) {
        try {
            var db = await dbConnection.get()
            var kq = await db.collection(loai_dt).insert(dt)
            return kq
        } catch (loi) {
            console.log(loi)
        }
    }
    async cap_nhat_doi_tuong(loai_dt,dieu_kien,gt_moi){
        try {
            var db =await dbConnection.get()
            var kq=await db.collection(loai_dt).update(dieu_kien,gt_moi)
            return kq
        } catch (loi) {
            console.log(loi)
        }
    }
    async xoa_doi_tuong(loai_dt,dieu_kien){
        try {
            var db=await dbConnection.get()
            var kq =await db.collection(loai_dt).delete(dieu_kien)
            return kq
        } catch (loi) {
            console.log(loi)
        }
    }
    async doc_thong_tin_tivi(){
        try {
            var db =await dbConnection.get()
            var kq =await db.collection("sp_tivi").find({}).toArray()
            return kq
        } catch (loi) {
            console.log(loi)
        }
    }
    async doc_thong_ch_tv(){
        try {
            var db= await dbConnection.get()
            var kq=await db.collection('cua_hang_tv').find({}).toArray()
            return kq
        } catch (loi) {
            console.log(loi)
        }
    }
    

}
var xu_ly = new xl_luu_tru()
module.exports = xu_ly