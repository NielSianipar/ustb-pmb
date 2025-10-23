let url = "pendaftaran/daftar";

document.getElementById("form-pendaftaran").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Ambil semua nilai input
    const calonMahasiswaBaru = {
        nama_lengkap: document.getElementById("nama_lengkap").value,
        nik: document.getElementById("nik").value,
        nisn: document.getElementById("nisn").value,
        alamat: document.getElementById("alamat").value,
        provinsi: document.getElementById("provinsi").value,
        kabupaten: document.getElementById("kabupaten").value,
        kecamatan: document.getElementById("kecamatan").value,
        kelurahan: document.getElementById("kelurahan").value,
        kode_pos: document.getElementById("kode_pos").value,
        tempat_lahir: document.getElementById("tempat_lahir").value,
        tanggal_lahir: document.getElementById("tanggal_lahir").value,
        jenis_kelamin: document.getElementById("jenis_kelamin").value,
        agama: document.getElementById("agama").value,
        nomor_hp: document.getElementById("nomor_hp").value,
        email: document.getElementById("email").value,
        pas_foto: document.getElementById("pas_foto").value,
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(calonMahasiswaBaru),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (!res.ok) {
            // Tampilkan error dari server
            if (data.errors) {
                console.error("Validasi gagal:", data.errors);
                alert("Terjadi kesalahan validasi, periksa input!");
            } else {
                console.error("Error server:", data.message || res.statusText);
                alert(`Terjadi error: ${data.message || res.statusText}`);
            }
            return;
        }

        console.log("Sukses:", data);
        alert("Data berhasil dikirim!");

        // Reset the form after successful submission
        document.getElementById("form-pendaftaran").reset();
        // #TODO buat link untuk ke arah page selanjutnya setelah submit
    } catch (error) {
        console.error("Error fetch:", error);
        alert("Gagal mengirim data, cek koneksi atau server.");
    }
});
