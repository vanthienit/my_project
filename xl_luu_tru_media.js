var File = require('fs')
var thu_muc_media = "media"
var thu_muc_pdf = "tap_tin"
var cong_nghe = "json"

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
    if (matches.length !== 3) {
        return new Error('Lỗi...')
    }
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64')
    return response
}
class xl_luu_tru {
    doc_thong_tin_dv() {
        var chuoi_html = ""
        var duong_dan = "index.html"
        if (File.existsSync(duong_dan))
            chuoi_html = File.readFileSync(duong_dan)
        return chuoi_html
    }
    doc_nhi_phan_media(ten){
        var nhi_phan=""
        var duong_dan = thu_muc_media +"//"+ten
        if(File.existsSync(duong_dan))
            nhi_phan = File.readFileSync(duong_dan)
        return nhi_phan
    }
    ghi_nhi_phan_media(ten,chuoi_NP){
        var kq="ok"
        try {
            var nhi_phan =decodeBase64Image(chuoi_NP)
            var duong_dan = thu_muc_media +"//"+ten
            File.writeFileSync(duong_dan,nhi_phan.data)
        } catch (loi) {
            kq=loi.toString()
        }
        return kq
    }
    ghi_tap_tin_pdf(ten,chuoi_NP){
        var kq='ok'
        try {
            var nhi_phan = decodeBase64Image(chuoi_NP)
            var duong_dan = thu_muc_pdf+"//"+ten
            File.writeFileSync(duong_dan,nhi_phan.data)
        } catch (loi) {
            kq=loi.toString()
        }
        return kq
    }
}
var xl = new xl_luu_tru()
module.exports = xl