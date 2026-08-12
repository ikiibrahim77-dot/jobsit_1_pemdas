// ===========================
// VARIABEL
// ===========================

let keranjang = [];

let total = 0;

let nomor = 1;

let diskon = 0;
const list = document.getElementById("listKeranjang");
const totalHarga = document.getElementById("total");

const laporanBody = document.getElementById("laporanBody");
const laporanTotal = document.getElementById("laporanTotal");
const statusPesanan = document.getElementById("statusPesanan");
// ===========================
// TAMBAH KE KERANJANG
// ===========================

function tambahKeranjang(nama, harga){

    let index =
    keranjang.findIndex(item => item.nama === nama);

    if(index !== -1){

        keranjang[index].jumlah++;

    }else{

        keranjang.push({

            nama:nama,

            harga:harga,

            jumlah:1

        });

    }

    tampilKeranjang();

}

// ===========================
// TAMPILKAN KERANJANG
// ===========================

function tampilKeranjang(){

    list.innerHTML="";

    total=0;

    keranjang.forEach((item,index)=>{

        total += item.harga * item.jumlah;

        let li=document.createElement("li");

        li.innerHTML=`

        <strong>${item.nama}</strong><br>

        Harga :
        Rp${item.harga.toLocaleString('id-ID')}<br>

        Jumlah :
        ${item.jumlah}

        <br><br>

        <button onclick="kurangi(${index})">➖</button>

        <button onclick="tambah(${index})">➕</button>

        <button onclick="hapus(${index})">🗑 Hapus</button>

        <hr>

        `;

        list.appendChild(li);

    });

    totalHarga.innerHTML=

    `Total : Rp${total.toLocaleString('id-ID')}`;

}

// ===========================
// TAMBAH JUMLAH
// ===========================

function tambah(index){

    keranjang[index].jumlah++;

    tampilKeranjang();

}

// ===========================
// KURANGI JUMLAH
// ===========================

function kurangi(index){

    if(keranjang[index].jumlah>1){

        keranjang[index].jumlah--;

    }else{

        keranjang.splice(index,1);

    }

    tampilKeranjang();

}

// ===========================
// HAPUS PRODUK
// ===========================

function hapus(index){

    keranjang.splice(index,1);

    tampilKeranjang();

}

// ===========================
// RATING BINTANG
// ===========================

function beriRating(elemen, nilai){

    let bintang = elemen.parentElement.children;

    for(let i=0;i<bintang.length;i++){

        if(i < nilai){
            bintang[i].innerHTML = "★";
            bintang[i].classList.add("aktif");
        }else{
            bintang[i].innerHTML = "☆";
            bintang[i].classList.remove("aktif");
        }

    }

}

// ===========================
// PROMO
// ===========================

function lihatPromo(){

    alert(
`🎉 PROMO HARI INI 🎉

✅ Diskon hingga 50%

✅ Gratis Ongkir

✅ Cashback 20%

Promo berlaku sampai pukul 23.59 WIB`
    );

}

// ===========================
// METODE PEMBAYARAN
// ===========================

function ambilMetodePembayaran(){

    let metode =
    document.querySelector('input[name="payment"]:checked');

    if(metode == null){

        alert("Silakan pilih metode pembayaran!");

        return null;

    }

    return metode.value;

}

// ===========================
// CHECKOUT
// ===========================

function checkout(){

    if(keranjang.length == 0){

        alert("Keranjang masih kosong!");

        return;

    }

    let metode = ambilMetodePembayaran();

    if(metode == null){
        return;
    }

    // Total setelah diskon
    let totalAkhir = total - diskon;

    if(totalAkhir < 0){
        totalAkhir = 0;
    }

    // ===========================
    // LAPORAN PRODUK
    // ===========================

    laporanBody.innerHTML = "";

    nomor = 1;

    keranjang.forEach((item) => {

        let subtotal = item.harga * item.jumlah;

        laporanBody.innerHTML += `
        <tr>
            <td>${nomor++}</td>

            <td>
                ${item.nama} (${item.jumlah}x)
            </td>

            <td>
                Rp${subtotal.toLocaleString('id-ID')}
            </td>
        </tr>
        `;

    });


    // ===========================
    // LAPORAN DISKON
    // ===========================

    if(diskon > 0){

        laporanBody.innerHTML += `
        <tr>
            <td>-</td>

            <td>
                🎟️ Voucher Diskon
            </td>

            <td>
                -Rp${diskon.toLocaleString('id-ID')}
            </td>
        </tr>
        `;

    }


    // ===========================
    // TOTAL LAPORAN
    // ===========================

    laporanTotal.innerHTML =
    `Rp${totalAkhir.toLocaleString('id-ID')}`;


    // ===========================
    // ALERT CHECKOUT
    // ===========================

    alert(

`Checkout Berhasil!

Metode Pembayaran :
${metode}

Total Sebelum Diskon :
Rp${total.toLocaleString('id-ID')}

Diskon :
Rp${diskon.toLocaleString('id-ID')}

Total Bayar :
Rp${totalAkhir.toLocaleString('id-ID')}

Terima kasih telah berbelanja 😊`

    );


    // ===========================
    // STATUS PESANAN
    // ===========================

    statusPesanan.innerHTML =
    "📦 Diproses";

    setTimeout(function(){

        statusPesanan.innerHTML =
        "📦 Dikemas";

    },3000);

    setTimeout(function(){

        statusPesanan.innerHTML =
        "🚚 Dikirim";

    },6000);

    setTimeout(function(){

        statusPesanan.innerHTML =
        "✅ Pesanan Selesai";

    },9000);


    // ===========================
    // KOSONGKAN KERANJANG
    // ===========================

    keranjang = [];

    list.innerHTML = "";

    total = 0;

    diskon = 0;

    totalHarga.innerHTML =
    "Total : Rp0";

}

// ===========================
// DARK MODE
// ===========================

const darkBtn =
document.getElementById("darkModeBtn");

darkBtn.addEventListener("click",function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        darkBtn.innerHTML="☀ Light Mode";

    }else{

        darkBtn.innerHTML="🌙 Dark Mode";

    }

});
// ===========================
// CARI PRODUK
// ===========================
// ===========================
// VOUCHER DISKON
// ===========================

function gunakanVoucher(){

    let kode =
    document.getElementById("kodeVoucher").value;

    let pesan =
    document.getElementById("pesanVoucher");


    if(kode === "HEMAT10"){

        diskon = total * 0.10;

        pesan.innerHTML =
        "✅ Voucher berhasil! Diskon 10%";

    }

    else if(kode === "DISKON50"){

        diskon = 50000;

        pesan.innerHTML =
        "✅ Voucher berhasil! Potongan Rp50.000";

    }

    else if(kode === "ONGKIRGRATIS"){

        diskon = 20000;

        pesan.innerHTML =
        "✅ Voucher berhasil! Gratis ongkir";

    }

    else{

        diskon = 0;

        pesan.innerHTML =
        "❌ Kode voucher tidak tersedia";

    }


    let totalAkhir = total - diskon;


    if(totalAkhir < 0){
        totalAkhir = 0;
    }


    totalHarga.innerHTML =
    `Total : Rp${totalAkhir.toLocaleString('id-ID')}`;

}
function cariProduk(){

    let input =
    document.getElementById("search").value.toLowerCase();

    let card =
    document.querySelectorAll(".card");

    card.forEach(function(item){

        let nama =
        item.querySelector("h3").innerText.toLowerCase();

        if(nama.includes(input)){

            item.style.display="block";

        }else{

            item.style.display="none";

        }

    });

}