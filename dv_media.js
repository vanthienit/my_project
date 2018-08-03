var http = require('http')
var luu_tru = require('../xu_ly/xl_luu_tru')
var xl_quest = require('querystring')
var port = normalizePort(process.env.PORT || 10002)
var dv_media = http.createServer(function (yeu_cau, dap_ung) {
    var chuoi_nhan = ""
    var nhi_phan_kq = ""
    var ten = yeu_cau.url.replace("/", "")
    yeu_cau.on('data', function (chunk) { chuoi_nhan += chunk })
    yeu_cau.on('end', function () {
        if(yeu_cau.method == "GET" && ten!=""){
            nhi_phan_kq = luu_tru.doc_nhi_phan_media(ten)
            dap_ung.setHeader('Access-Control-Allow-Origin',"*")
            dap_ung.setHeader('Access-Control-Allow-Methods','GET,PUT,PUSH,DELETE')
            dap_ung.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type')
            dap_ung.setHeader('Access-Control-Allow-Credentials', true)
            dap_ung.end(nhi_phan_kq)
        }else if(yeu_cau.method =="POST" && yeu_cau.url=="/ghi_pdf"){
            var pdf =JSON.parse(chuoi_nhan)
            var kq = luu_tru.ghi_tap_tin_pdf(pdf.Ten, pdf.Chuoi_nhi_phan)
            dap_ung.setHeader('Access-Control-Allow-Origin','*')
            dap_ung.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
            dap_ung.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type')
            dap_ung.setHeader('Access-Control-Allow-Credentials',true)
            dap_ung.end(kq)
        }else if(yeu_cau.method =="POST"){
            var hinh = JSON.parse(chuoi_nhan)
            var kq =luu_tru.ghi_nhi_phan_media(hinh.Ten,hinh.Chuoi_nhi_phan)
            dap_ung.setHeader('Access-Control-Allow-Origin','*')
            dap_ung.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
            dap_ung.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type')
            dap_ung.setHeader('Access-Control-Allow-Credentials',true)
            dap_ung.end(kq)
        }else{
            nhi_phan_kq = luu_tru.doc_thong_tin_dv()
            dap_ung.setHeader('Access-Control-Allow-Origin','*')
            dap_ung.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
            dap_ung.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type')
            dap_ung.setHeader('Access-Control-Allow-Credentials',true)
            dap_ung.end(nhi_phan_kq)
        }

    })
})
dv_media.listen(port, console.log('Dịch vụ media đang chạy ... ' + port))
dv_media.on('error', onError)
dv_media.on('listening', onListening)
function normalizePort(val) {
    var port = parseInt(val, 10)
    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    return false
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.log(bind + 'requires elevated privileges')
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(bind + ' is already in use')
            process.exit(1)
            break;
        default:
            throw error;
    }
}
function onListening(){
    var addr = dv_media.address();
    var bind = typeof addr ==='string'
        ?'pipe ' + addr
        :'port ' + addr.port;
        console.log('Listening on ' + bind)
}