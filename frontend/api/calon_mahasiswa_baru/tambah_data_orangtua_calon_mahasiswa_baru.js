let url = "http://localhost:3000/pendaftaran/data-orangtua";

document.getElementById("form-data-orangtua").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Ambil semua nilai input
    const dataOrangtuaCalonMahasiswaBaru = {
        nama_lengkap_ayah: document.getElementById("nama_lengkap_ayah").value,
        kondisi: document.getElementById("kondisi").value,
        nama_lengkap_ibu: document.getElementById("nama_lengkap_ibu").value,
        pendidikan_terakhir_ayah: document.getElementById("pendidikan_terakhir_ayah").value,
        pendidikan_terakhir_ibu: document.getElementById("pendidikan_terakhir_ibu").value,
        pekerjaan_ayah: document.getElementById("pekerjaan_ayah").value,
        penghasilan_ayah: document.getElementById("penghasilan_ayah").value,
        pekerjaan_ibu: document.getElementById("pekerjaan_ibu").value,
        penghasilan_ibu: document.getElementById("penghasilan_ibu").value,
        nomor_hp_orangtua: document.getElementById("nomor_hp_orangtua").value,
        alamat_orangtua: document.getElementById("alamat_orangtua").value,
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(dataOrangtuaCalonMahasiswaBaru),
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
         document.getElementById("form-data-orangtua").reset();

    } catch (error) {
        console.error("Error fetch:", error);
        alert("Gagal mengirim data, cek koneksi atau server.");
    }
});
