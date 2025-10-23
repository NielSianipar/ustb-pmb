
let baseUrl = "http://localhost:3000/wilayah"


document.addEventListener("DOMContentLoaded", async () => {
  const selectProvinsi   = document.getElementById("provinsi");
  const selectKabupaten  = document.getElementById("kabupaten");
  const selectKecamatan  = document.getElementById("kecamatan");
  const selectKelurahan  = document.getElementById("kelurahan");

  let provinsiMap = {};    // { name: code }
  let kabupatenMap = {};   // { name: code }
  let kecamatanMap = {};   // { name: code }

  async function loadDropdown(url, select, placeholder, map = null) {
    try {
      const res = await fetch(url);
      const data = await res.json();

      select.innerHTML = `<option value="">${placeholder}</option>`;
      if (map) map = {}; // reset map jika ada

      data.data.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.name; // value = name untuk form/backend
        opt.textContent = item.name;
        select.appendChild(opt);

        if (map) map[item.name] = item.code; // simpan mapping name→code
      });

      select.disabled = false;
      return map;
    } catch (err) {
      console.error(`Gagal load ${placeholder}`, err);
      select.innerHTML = `<option value="">Gagal memuat data</option>`;
      select.disabled = true;
      return map;
    }
  }

  // 1. Load provinsi
  provinsiMap = await loadDropdown(`${baseUrl}/provinsi`, selectProvinsi, "Pilih provinsi...", provinsiMap);

  // 2. Load kabupaten ketika provinsi dipilih
  selectProvinsi.addEventListener("change", async () => {
    const provName = selectProvinsi.value;
    if (!provName) {
      selectKabupaten.innerHTML = "<option value=''>Pilih provinsi dulu</option>";
      selectKabupaten.disabled = true;
      selectKecamatan.innerHTML = "<option value=''>Pilih kabupaten dulu</option>";
      selectKecamatan.disabled = true;
      selectKelurahan.innerHTML = "<option value=''>Pilih kecamatan dulu</option>";
      selectKelurahan.disabled = true;
      return;
    }

    const provCode = provinsiMap[provName];

    selectKabupaten.disabled = true;
    selectKabupaten.innerHTML = "<option value=''>Loading kabupaten...</option>";
    selectKecamatan.innerHTML = "<option value=''>Pilih kabupaten dulu</option>";
    selectKecamatan.disabled = true;
    selectKelurahan.innerHTML = "<option value=''>Pilih kecamatan dulu</option>";
    selectKelurahan.disabled = true;

    kabupatenMap = await loadDropdown(`${baseUrl}/kabupaten/${provCode}`, selectKabupaten, "Pilih kabupaten...", kabupatenMap);
  });

  // 3. Load kecamatan ketika kabupaten dipilih
  selectKabupaten.addEventListener("change", async () => {
    const kabName = selectKabupaten.value;
    if (!kabName) {
      selectKecamatan.innerHTML = "<option value=''>Pilih kabupaten dulu</option>";
      selectKecamatan.disabled = true;
      selectKelurahan.innerHTML = "<option value=''>Pilih kecamatan dulu</option>";
      selectKelurahan.disabled = true;
      return;
    }

    const kabCode = kabupatenMap[kabName];

    selectKecamatan.disabled = true;
    selectKecamatan.innerHTML = "<option value=''>Loading kecamatan...</option>";
    selectKelurahan.innerHTML = "<option value=''>Pilih kecamatan dulu</option>";
    selectKelurahan.disabled = true;

    kecamatanMap = await loadDropdown(`${baseUrl}/kecamatan/${kabCode}`, selectKecamatan, "Pilih kecamatan...", kecamatanMap);
  });

  // 4. Load kelurahan ketika kecamatan dipilih
  selectKecamatan.addEventListener("change", async () => {
    const kecName = selectKecamatan.value;
    if (!kecName) {
      selectKelurahan.innerHTML = "<option value=''>Pilih kecamatan dulu</option>";
      selectKelurahan.disabled = true;
      return;
    }

    const kecCode = kecamatanMap[kecName];

    selectKelurahan.disabled = true;
    await loadDropdown(`${baseUrl}/kelurahan/${kecCode}`, selectKelurahan, "Pilih kelurahan...");
  });
});
