let urlIndex = "/"
let urlInfoPendaftaran = "/pendaftaran"
let urlAkreditasi = "/akreditasi"
let urlBiayaKuliah = "/biaya-kuliah"
let urlFaq = "/faq"
let urlSarana = "/sarana"
let urlKegiatanMahasiswa = "/kegiatan-mahasiswa"


// ke halaman Info Pendaftaran

// ke halaman Index
document.getElementById("index").addEventListener("click", function () {
    window.location.href = urlIndex;
});

document.querySelectorAll(".pendaftaran").forEach(btn => {
  btn.addEventListener("click", () => {
    window.location.href = urlInfoPendaftaran;
  });
});

// ke halaman Akreditasi
document.getElementById("akreditasi").addEventListener("click", function () {
    window.location.href = urlAkreditasi;
});

// ke halaman Biaya Kuliah
document.getElementById("biayakuliah").addEventListener("click", function () {
    window.location.href = urlBiayaKuliah;
});

// ke halaman FAQ
document.getElementById("faq").addEventListener("click", function () {
    window.location.href = urlFaq;
});

// ke halaman Sarana
document.getElementById("sarana").addEventListener("click", function () {
    window.location.href = urlSarana;
});

// ke halaman kegiatan-mahasiwswa
document.getElementById("kegiatan-mahasiswa").addEventListener("click", function () {
    window.location.href = urlKegiatanMahasiswa;
});
