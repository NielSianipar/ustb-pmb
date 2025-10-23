let url = "http://localhost:3000/pendaftaran/data-berkas";

document.getElementById("form-berkas").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Ambil form element
    const form = document.getElementById("form-berkas");

    // Buat FormData dari form
    const formData = new FormData(form);

    try {
        
        const res = await fetch(url, {
            method: 'POST',
            credentials: "include",
            body: formData,
        });
        const text = await res.text(); // ambil raw response
    console.log("Raw response:", text);

       const data = JSON.parse(text);
        console.log("JSON parsed:", data);

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
         document.getElementById("form-berkas").reset();

    } catch (error) {
        console.error("Error fetch:", error);
        alert("Gagal mengirim data, cek koneksi atau server.");
    }
});
