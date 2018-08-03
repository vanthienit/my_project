var dia_chi_dv = "http://server-service.herokuapp.com"
var dia_chi_media = "http://server-media.herokuapp.com"
var tap_tin_pdf = "tap_tin"

function doc_danh_sach_dt() {
    return new Promise((ket_qua, loi) => {
        var du_lieu = {}
        var tham_so = `ms_xl=doc_ds_dt`
        var dia_chi_xl = `${dia_chi_dv}?${tham_so}`
        var xl_http = new XMLHttpRequest()
        xl_http.onload = () => {
            var chuoi = xl_http.responseText
            if (chuoi != "")
                du_lieu = JSON.parse(chuoi)
            ket_qua(du_lieu)
        }
        xl_http.open("POST", dia_chi_xl, false)
        xl_http.send("")
    })
}
function doc_ds_tivi() {
    return new Promise((ket_qua, loi) => {
        var du_lieu = {}
        var tham_so = `ms_xl=doc_thong_tin_tivi`
        var dia_chi_xl = `${dia_chi_dv}?${tham_so}`
        var xl_http = new XMLHttpRequest()
        xl_http.onload = () => {
            var chuoi = xl_http.responseText
            if (chuoi != "")
                du_lieu = JSON.parse(chuoi)
            ket_qua(du_lieu)
        }
        xl_http.open('POST', dia_chi_xl, false)
        xl_http.send("")
    })
}

function tao_the_hien_dt(doi_tuong, th_cha) {
    var the_hien = document.createElement('div')
    the_hien.setAttribute("data", JSON.stringify(doi_tuong))
    th_cha.appendChild(the_hien);
    var chuoi_html = `<div id="th_dt" class="card m-2 p-2 style="width:14rem;height:24rem">
        <img class="card-img-top" style="max-width:250px;max-height:180px;" src="${dia_chi_media}/${doi_tuong.Ma_so}.png" alt="">
        <div class="card-body">
            <h6 class="card-title text-primary">${doi_tuong.Ten}</h6>
            <p class="card-text text-danger">Giá: ${doi_tuong.Don_gia_Ban}</p>
            Loại: ${doi_tuong.Nhom_Dien_thoai.Ten}
        </div>
        <button class="btn btn-sm btn-danger">Đặt Hàng</button>
    </div>`
    the_hien.innerHTML = chuoi_html
    return the_hien
}
function tao_th_ch(doi_tuong, th_ch) {
    var the_hien = document.createElement('div')
    th_ch.appendChild(the_hien)
    noi_dung = `<img class="img-fluid float-left d-none d-md-block" src="${dia_chi_media}/${doi_tuong.Ma_so}.png" />
    <h2 class="text-center text-primary">${doi_tuong.Ten}<br>
    <small>${doi_tuong.Dia_chi} - ${doi_tuong.Dien_thoai} - ${doi_tuong.Mail}</small>
    </h2>`
    the_hien.innerHTML = noi_dung
    return the_hien
}
function tao_the_hien_tivi(doi_tuong, th_cha) {
    var the_hien = document.createElement('div')
    the_hien.setAttribute("data", JSON.stringify(doi_tuong))
    th_cha.appendChild(the_hien);
    var chuoi_html = `<div class="card m-2 p-2 id="th_tivi" style="width:14rem;height:24rem">
        <img class="card-img-top" style="max-width:300px;max-height:150px;" src="${dia_chi_media}/${doi_tuong.Ma_so}.png" alt="">
        <div class="card-body">
        <h6 class="card-title text-primary">${doi_tuong.Ten}</h6>
        <p class="card-text text-danger">Giá: ${doi_tuong.Don_gia_Ban}</p>
        Loại: ${doi_tuong.Nhom_Tivi.Ten}
    </div>
        
        <button class="btn btn-sm btn-danger">Đặt Hàng</button>
    </div>`
    the_hien.innerHTML = chuoi_html
    return the_hien
}
function tao_th_phan_trang(ds_sp, so_sp_1_trang, th_pt) {
    var tong_sp = ds_sp.length
    var tong_trang = (tong_sp % so_sp_1_trang == 0) ? tong_sp / so_sp_1_trang : parseInt(tong_sp / so_sp_1_trang) + 1
    var noi_dung_html = `<nav aria-label="page navigation">`
    noi_dung_html += `<ul class="pagination justify-content-center">`
    for (var i = 1; i <= tong_trang; i++) {
        var vt = (i - 1) * so_sp_1_trang
        noi_dung_html += `<li class="page-item"><a class="page-link" href="javaScript:void(0)" onclick="xuat_ds_pt(du_lieu.tivi.ds_tivi, th_thong_bao,${vt},${limittv})">${i}</a></li>`
    }
    noi_dung_html += `</ul>
            </nav>`
    th_pt.innerHTML = noi_dung_html
}
function tao_th_phan_trang_dt(ds_sp, so_sp_1_trang, th_pt) {
    var tong_sp = ds_sp.length
    var tong_trang = (tong_sp % so_sp_1_trang == 0) ? tong_sp / so_sp_1_trang : parseInt(tong_sp / so_sp_1_trang) + 1
    var noi_dung_html = `<nav aria-label="page navigation">`
    noi_dung_html += `<ul class="pagination justify-content-center">`
    for (var i = 1; i <= tong_trang; i++) {
        var vt = (i - 1) * so_sp_1_trang
        noi_dung_html += `<li class="page-item"><a class="page-link" href="javaScript:void(0)" onclick="xuat_ds_pt_dt(du_lieu.dien_thoai.ds_dien_thoai, th_thong_bao,${vt},${limit})">${i}</a></li>`
    }
    noi_dung_html += `</ul>
            </nav>`
    th_pt.innerHTML = noi_dung_html
}
