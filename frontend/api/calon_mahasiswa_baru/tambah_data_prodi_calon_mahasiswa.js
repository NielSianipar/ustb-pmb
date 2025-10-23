let url = "http://localhost:3000/pendaftaran/data-prodi";

document.getElementById("form-pilihan-prodi").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Ambil semua nilai input
    const dataProdiCalonMahasiswaBaru = {
        pilihan_satu: document.getElementById("pilihan_satu").value,
        pilihan_dua: document.getElementById("pilihan_dua").value,
        jalur_masuk: document.getElementById("jalur_masuk").value,
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(dataProdiCalonMahasiswaBaru),
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
         document.getElementById("form-pilihan-prodi").reset();

    } catch (error) {
        console.error("Error fetch:", error);
        alert("Gagal mengirim data, cek koneksi atau server.");
    }
});
