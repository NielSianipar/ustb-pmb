import express from "express"
import session from "express-session";
import cors from "cors";

import path from 'path';
import { fileURLToPath } from 'url';

import multer from "multer";

import authentication from "./routes/authentication.js"
import daftarCalonMahasiswaBaru from "./routes/calon_mahasiswa_baru.js"
import chart from "./routes/chart.js"
import wilayah from "./routes/wilayah.js";
import halaman from "./routes/page.js";
import form from "./routes/form.js";

const PORT = 4000
const app = express()
app.use(express.json());

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.use(
  session({
    secret: "testing",   // ganti dengan secret yang aman
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true } // kalau HTTPS ganti jadi true
  })
);

// Middleware khusus buat error Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        status: "error",
        message: "Ukuran file maksimal 1 MB!"
      });
    }
  }
  next(err);
});

app.use("/", halaman);
app.use('/chart', chart)
app.use('/login', authentication)
app.use('/pendaftaran', daftarCalonMahasiswaBaru)
app.use("/wilayah", wilayah);
app.use("/form", form);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "..", "frontend", "page", "notfound.html"));
});


app.listen(PORT, () => console.log(`Server running on port : http://localhost:${PORT}`))