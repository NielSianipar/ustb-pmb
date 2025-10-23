let url = "http://localhost:3000/pendaftaran/data-pendidikan";

document.getElementById("form-pendidikan").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Ambil semua nilai input
    const dataPendidikanCalonMahasiswaBaru = {
        asal_sekolah: document.getElementById("asal_sekolah").value,
        jurusan: document.getElementById("jurusan").value,
        tahun_lulus: document.getElementById("tahun_lulus").value,
        nomor_ijazah: document.getElementById("nomor_ijazah").value,
        nilai_rapor: document.getElementById("nilai_rapor").value,
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(dataPendidikanCalonMahasiswaBaru),
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
         document.getElementById("form-pendidikan").reset();

    } catch (error) {
        console.error("Error fetch:", error);
        alert("Gagal mengirim data, cek koneksi atau server.");
    }
});
