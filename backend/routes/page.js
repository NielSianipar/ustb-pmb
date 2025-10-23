import express from "express";
import path from 'path';

const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { fileURLToPath } from 'url';

const pages = {
  "/": "index.html",
  "/pendaftaran": path.join("home", "infopendaftaran.html"),
  "/akreditasi": path.join("home", "akreditasi.html"),
  "/biaya-kuliah": path.join("home", "biayakuliah.html"),
  "/faq": path.join("home", "faq.html"),
  "/sarana": path.join("home", "sarana.html"),
  "/kegiatan-mahasiswa": path.join("home", "kegiatanmahasiswa.html"),
  "/dashboard": path.join("admin", "dashboard.html"),
};

const dashboard = {

  "/dashboard": "dashboard.html",
};


Object.entries(pages).forEach(([route, file]) => {
  router.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "page", file));
  });
});

export default router;
