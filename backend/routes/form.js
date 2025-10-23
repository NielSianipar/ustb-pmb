import express from "express";
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { fileURLToPath } from 'url';

const router = express.Router();

const pages = {
  "/daftar": path.join("forms", "formAlur.html"),
  "/form-pendidikan": path.join("forms", "form-pendidikan.html"),
  "/form-prodi": path.join("forms", "form-pilihan-prodi.html"),
  "/form-berkas": path.join("forms", "form-berkas.html"),
  "/form-orangtua": path.join("forms", "form-data-orangtua.html")
};

Object.entries(pages).forEach(([route, file]) => {
  router.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "page",file));
  });
});

export default router;
