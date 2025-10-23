
let urlDaftar = "/form/daftar"
let urlDataBerkasCalonMahasiswa = "/form/form-berkas"
let urlDataOrangtuaCalonMahasiswa = "/form/form-orangtua"
let urlDataPendidikanCalonMahasiswa = "/form/form-pendidikan"
let urlDataProdiCalonMahasiswa = "/form/form-prodi"



document.querySelectorAll(".daftar").forEach(btn => {
  btn.addEventListener("click", () => {
    window.location.href = urlDaftar;
  });
});
// // Pendaftaran
// document.getElementById("daftar").addEventListener("click", function () {
//     window.location.href = urlDaftar;
// });
// document.getElementById("daftar2").addEventListener("click", function () {
//     window.location.href = urlDaftar;
// });
// document.getElementById("daftar3").addEventListener("click", function () {
//     window.location.href = urlDaftar;
// });
// document.getElementById("daftar4").addEventListener("click", function () {
//     window.location.href = urlDaftar;
// });

// // Data Berkas
// document.getElementById("form-berkas").addEventListener("click", function () {
//     window.location.href = urlDataBerkasCalonMahasiswa;
// });

// // Data Orangtua
// document.getElementById("form-orangtua").addEventListener("click", function () {
//     window.location.href = urlDataOrangtuaCalonMahasiswa;
// });

// // Data Pendidikan
// document.getElementById("form-pendidikan").addEventListener("click", function () {
//     window.location.href = urlDataPendidikanCalonMahasiswa;
// });

// // Data Prodi
// document.getElementById("form-prodi").addEventListener("click", function () {
//     window.location.href = urlDataProdiCalonMahasiswa;
// });