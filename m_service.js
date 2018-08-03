var http = require('http')
var luu_tru = require('../xu_ly/xl_luu_tru')
var xl_quest = require('querystring')
var port = normalizePort(process.env.PORT || 1000)
var du_lieu = {}
var ds_tivi = luu_tru.doc_thong_tin_tivi()
var cua_hang_tv = luu_tru.doc_thong_ch_tv()
var ds_dien_thoai = luu_tru.doc_thong_tin_dien_thoai()
var nguoi_dung = luu_tru.doc_thong_tin_nguoi_dung()
var ds_thanh_ly = luu_tru.doc_danh_sach_thanh_ly()
var cua_hang = luu_tru.doc_thong_tin_cua_hang()
ds_dien_thoai.then(x => {
    du_lieu.ds_dien_thoai = x
})
nguoi_dung.then(x => {
    du_lieu.nguoi_dung = x
})
ds_thanh_ly.then(x => {
    du_lieu.ds_thanh_ly = x
})
cua_hang.then(x => {
    du_lieu.cua_hang = x[0]
})
ds_tivi.then(x=>{
    du_lieu.ds_tivi=x
})
cua_hang_tv.then(x=>{
    du_lieu.cua_hang_tv=x
})
console.log(du_lieu)
var m_service = http.createServer(function (yeu_cau, dap_ung) {
    var chuoi_nhan = ""
    var chuoi_kq = ""
    var m_addr = yeu_cau
    .url
    .replace("/", "").replace("?", "")
    var ma_so = xl_quest.parse(m_addr)
    var ms_xl = ma_so.ms_xl
    yeu_cau.on('data', function (chunk) { chuoi_nhan += chunk })
    yeu_cau.on('end', function () {
        if (ms_xl == 'doc_ds_dt') {
            var dt_kq = {}
            dt_kq.ds_dien_thoai = du_lieu.ds_dien_thoai
            dt_kq.cua_hang = du_lieu.cua_hang
            chuoi_kq = JSON.stringify(dt_kq)
            dap_ung.setHeader("Access-Control-Allow-Origin", "*")
            dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
            dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-with ,content-type')
            dap_ung.setHeader('Access-Control-Allow-Credentials', true)
            dap_ung.end(chuoi_kq)
        }
        else if(ms_xl=='doc_thong_tin_tivi'){
            var dt_kq = {}
            dt_kq.ds_tivi = du_lieu.ds_tivi
            dt_kq.cua_hang_tv = du_lieu.cua_hang_tv
            chuoi_kq=JSON.stringify(dt_kq)
            dap_ung.setHeader("Access-Control-Allow-Origin", "*")
            dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
            dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-with ,content-type')
            dap_ung.setHeader('Access-Control-Allow-Credentials', true)
            dap_ung.end(chuoi_kq)   
        }
        else if (ms_xl == `doc_ds_tldt`) {
            var dt_kq = {}
            dt_kq.ds_thanh_ly = du_lieu.ds_thanh_ly
            chuoi_kq = stringify(dt_kq)
            dap_ung.setHeader("Access-Control-Allow-Origin", "*");
            dap_ung.setHeader('Acces-Control-Allow-Methods', 'GET,PUT,PUSH,DELETE');
            dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-with, content-type')
            dap_ung.setHeader('Access-Control-Allow-Credentials', true)
            dap_ung.end(chuoi_kq)
        }
        else if (ms_xl == `dang_nhap`) {
            var dt_kq = {}
            var thong_tin = JSON.parse(chuoi_nhan)
            var nguoi_dung = du_lieu.nguoi_dung.find(x => x.Ten_Dang_nhap.toLowerCase() == thong_tin.Ten_Dang_nhap.toLowerCase() && x.Mat_khau == thong_tin.Mat_khau)
            if (nguoi_dung) {
                dt_kq.Ten = nguoi_dung.Ten;
                dt_kq.Ma_so = nguoi_dung.Ma_so;
                dt_kq.Nhom_Nguoi_dung = nguoi_dung.Nhom_Nguoi_dung
            }
            chuoi_kq = JSON.stringify(dt_kq)
            dap_ung.setHeader("Access-Control-Allow-Origin", "*")
            dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PUSH,DELETE')
            dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested, content-type')
            dap_ung.setHeader('Access-Control-Allow-Credentials', true)
            dap_ung.end(chuoi_kq)
        }
        else if (ms_xl == `ghi_dt_moi`) {
            var kq
            var dien_thoai = JSON.parse(chuoi_nhan)
            kq = luu_tru.write_new_subj("Dien_thoai", dien_thoai)
            kq.then(x => {
                du_lieu.ds_dien_thoai.push(dien_thoai)
                chuoi_kq = JSON.parse(dien_thoai)
                dap_ung.setHeader("Access-Control-Allow-Origin", "*")
                dap_ung.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PUSH,DELETE')
                dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested,content-type')
                dap_ung.setHeader('Access-Control-Allow-Credentials', true)
                dap_ung.end(chuoi_kq)
            })
        }
        else if (ms_xl == `ghi_phieu_dat_hang`) {
            var kq = ""
            var dien_thoai = du_lieu.ds_dien_thoai.find(x => x.Ma_so == quest.Ma_so_Dien_thoai)
            var phieu_dat_hang = JSON.parse(chuoi_nhan)
            var so_phieu = dien_thoai.Danh_sach_Phieu_Dat.length + 1
            phieu_dat_hang.so_phieu = so_phieu
            dien_thoai.Danh_sach_Phieu_Dat.push(phieu_dat_hang)
            var dieu_kien = { "Ma_so": dien_thoai.Ma_so }
            var gia_tri_cap_nhat = {
                $set: { Danh_sach_Phieu_Dat: dien_thoai.Danh_sach_Phieu_Dat }
            }
            kq = luu_tru.update_subj("Dien_thoai", dieu_kien, gia_tri_cap_nhat)
            kq.then(x => {
                chuoi_kq = "ok"
                dap_ung.setHeader("Access-Control-Allow-Origin", "*");
                dap_ung.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
                dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-with, content-type');
                dap_ung.setHeader('Access-Control-Allow-Credentials', true)
                dap_ung.end(chuoi_kq)
            })
        } else if (ms_xl == `ghi_phieu_nhap_hang`) {
            var kq = ""
            var Danh_sach_Phieu_Nhap = JSON.parse(chuoi_nhan)
            Danh_sach_Phieu_Nhap.forEach(dt_nhap => {
                var dien_thoai = du_lieu.ds_dien_thoai.find(x => x.Ma_so == dt_nhap.Ma_so)
                var so_phieu = dien_thoai.Danh_sach_Phieu_Nhap.length + 1
                dt_nhap.phieu_nhap_hang.so_phieu = so_phieu
                dien_thoai.Danh_sach_Phieu_Nhap.push(dt_nhap, phieu_nhap_hang)
                var dieu_kien = { "Ma_so": dien_thoai.Ma_so }
                var gia_tri_cn = {
                    $set: { Danh_sach_Phieu_Nhap: dien_thoai.Danh_sach_Phieu_Nhap }
                }
                kq = luu_tru.update_subj("Dien_thoai", dieu_kien, gia_tri_cn)
                kq.then(x => {
                    chuoi_kq = "ok"
                    dap_ung.setHeader("Access-Control-Allow-Origin", "*");
                    dap_ung.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
                    dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-with, content-type');
                    dap_ung.setHeader('Access-Control-Allow-Credentials', true)
                    dap_ung.end(chuoi_kq)
                })
            })
        } else if (ms_xl == `ghi_phieu_ban_hang`) {
            var kq = ""
            var dien_thoai = du_lieu.ds_dien_thoai.find(x => x.Ma_so == quest.Ma_so_Dien_thoai)
            var phieu_ban_hang = JSON.parse(chuoi_nhan)
            var so_phieu = dien_thoai.Danh_sach_Phieu_Ban.length + 1
            phieu_ban_hang.so_phieu = so_phieu
            dien_thoai.Danh_sach_Phieu_Ban.push(phieu_ban_hang)
            var dieu_kien = { "Ma_so": dien_thoai.Ma_so }
            var gia_tri_cap_nhat = {
                $set: { Danh_sach_Phieu_Ban: dien_thoai.Danh_sach_Phieu_Dat }
            }
            kq = luu_tru.update_subj("Dien_thoai", dieu_kien, gia_tri_cap_nhat)
            kq.then(x => {
                chuoi_kq = "ok"
                dap_ung.setHeader("Access-Control-Allow-Origin", "*");
                dap_ung.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
                dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-with, content-type');
                dap_ung.setHeader('Access-Control-Allow-Credentials', true)
                dap_ung.end(chuoi_kq)
            })
        }
        else if (ms_xl == 'ghi_phieu_giao_hang') {
            var kq = ""
            var Phieu_Giao_hang = JSON.parse(chuoi_nhan)
            var dien_thoai = du_lieu.ds_dien_thoai.find(x => x.Ma_so == Phieu_Giao_hang.Ma_so)
            dien_thoai.Danh_sach_Phieu_Dat.forEach(Phieu => {
                if (Phieu.So_Phieu_Dat == Phieu_Giao_hang.So_Phieu_Dat) {
                    Phieu.Nhan_vien = Phieu_Giao_hang.Nhan_vien
                    Phieu.Trang_thai = "DA_GIAO_HANG"
                }
            })
            var Dieu_kien = { "Ma_so": dien_thoai.Ma_so }
            var Gia_tri_Cap_nhat = {
                $set: { Danh_sach_Phieu_Dat: dien_thoai.Danh_sach_Phieu_Dat }
            }
            kq = Luu_tru.update_subj("Dien_thoai", Dieu_kien, Gia_tri_Cap_nhat)
            kq.then(result => {
                console.log(result)
                chuoi_kq = "ok"
                dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                dap_ung.setHeader('Access-Control-Allow-Methodss', 'GET,PUT,POST,DELETE');
                dap_ung.setHeader('Access-Control-Allow-Headerss', 'X-Requested-With, content-type');
                dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                dap_ung.end(chuoi_kq);
            })
        } else if (ms_xl == "cap_nhat_dt") {
            var kq = ""
            var ds_cap_nhat = JSON.parse(chuoi_nhan)
            ds_cap_nhat.forEach(Dien_thoai_Cap_nhat => {
                var dien_thoai = du_lieu.ds_dien_thoai.find(x => x.Ma_so == Dien_thoai_Cap_nhat.Ma_so)
                dien_thoai.Ten = Dien_thoai_Cap_nhat.Ten
                dien_thoai.Don_gia_Ban = Dien_thoai_Cap_nhat.Don_gia_Ban
                dien_thoai.Don_gia_Nhap = Dien_thoai_Cap_nhat.Don_gia_Nhap
                dien_thoai.Nhom_Dien_thoai.Ten = Dien_thoai_Cap_nhat.Nhom_Dien_thoai.Ten
                dien_thoai.Nhom_Dien_thoai.Ma_so = Dien_thoai_Cap_nhat.Nhom_Dien_thoai.Ma_so
                var Dieu_kien = { "Ma_so": dien_thoai.Ma_so }
                var Gia_tri_Cap_nhat = {
                    $set: {
                        "Ten": dien_thoai.Ten,
                        "Don_gia_Ban": dien_thoai.Don_gia_Ban,
                        "Don_gia_Nhap": dien_thoai.Don_gia_Nhap,
                        "Nhom_Dien_thoai.Ten": dien_thoai.Nhom_Dien_thoai.Ten,
                        "Nhom_Dien_thoai.Ma_so": dien_thoai.Nhom_Dien_thoai.Ma_so
                    }
                }

                kq = Luu_tru.cap_nhat_doi_tuong("Dien_thoai", Dieu_kien, Gia_tri_Cap_nhat)

                kq.then(result => {
                    console.log(result)
                    chuoi_kq = "ok"
                    dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    dap_ung.setHeader('Access-Control-Allow-Methodss', 'GET,PUT,POST,DELETE');
                    dap_ung.setHeader('Access-Control-Allow-Headerss', 'X-Requested-With, content-type');
                    dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    dap_ung.end(chuoi_kq);
                })

            })
        } else if (ms_xl == "xoa_dt") {
            var Kkqq = ""
            var Danh_sach_Xoa = JSON.parse(chuoi_nhan)
            Danh_sach_Xoa.forEach(Dien_thoai_Xoa => {
                var dien_thoai = du_lieu.ds_dien_thoai.find(x => x.Ma_so == Dien_thoai_Xoa.Ma_so)
                var Dieu_kien = { "Ma_so": dien_thoai.Ma_so }
                kq = luu_tru.delete_subj("Dien_thoai", Dieu_kien)
                Kq.then(result => {
                    du_lieu.ds_dien_thoai = du_lieu.ds_dien_thoai.filter(x => x.Ma_so != Dien_thoai_Xoa.Ma_so)
                    Chuoi_Kq = "ok"
                    dap_ung.setHeader("Access-Control-Allow-Origin", '*')
                    dap_ung.setHeader('Access-Control-Allow-Methodss', 'GET,PUT,POST,DELETE');
                    dap_ung.setHeader('Access-Control-Allow-Headerss', 'X-Requested-With, content-type');
                    dap_ung.setHeader('Access-Control-Allow-Credentials', true);
                    dap_ung.end(chuoi_kq);
                }).catch(err => {
                    chuoi_kq = "Error"
                })

            })
            //console.log(Du_lieu.Danh_sach_Dien_thoai)
        } else {
            chuoi_kq = luu_tru.doc_thong_tin_dich_vu()
            dap_ung.setHeader("Access-Control-Allow-Origin", "*");
            dap_ung.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            dap_ung.setHeader('Access-Control-Allow-Headers', 'X-Requested-with, content-type');
            dap_ung.setHeader('Access-Control-Allow-Credentials', true)
            dap_ung.end(chuoi_kq)
        }
    })
})
m_service.listen(port, console.log('dịch vụ đang chạy...' + port));
m_service.on('error', onError);
m_service.on('listening', onListening);

///-----------------------------------------////
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        //name pipe 
        return val
    }
    if (port >= 0) {
        //port number
        return port;
    }
    return false;
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? "pipe" + port
        : 'port' + port
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' require elevated reivileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1);
            break
        default:
            throw error;
    }
}
function onListening(){
    var addr = m_service.address()
    var bind = typeof addr ==="string"
    ?'pipe ' + addr
    :'port ' + addr.port;
    console.log('Listening in '+ bind)
}
