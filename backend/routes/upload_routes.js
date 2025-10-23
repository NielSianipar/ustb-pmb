const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/user'); // Impor model User

const router = express.Router();

// 1. Konfigurasi Penyimpanan Multer
const storage = multer.diskStorage({
  // Tentukan folder tujuan penyimpanan file
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  // Tentukan nama file yang unik agar tidak ada duplikasi
  filename: function (req, file, cb) {
    // Contoh: user-173647823-profil.png
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'user-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// 2. Inisialisasi Multer dengan konfigurasi storage
const upload = multer({ storage: storage });

// 3. Buat Route untuk upload
// 'profilePicture' adalah nama field dari <input type="file" name="profilePicture"> di form HTML
router.post('/user/:userId/uploadProfile', upload.single('profilePicture'), async (req, res) => {
  const { userId } = req.params;

  try {
    // Cek apakah file berhasil di-upload oleh multer
    if (!req.file) {
      return res.status(400).json({ message: 'Tidak ada file yang di-upload.' });
    }

    // Cari user di database
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan.' });
    }

    // Dapatkan path file yang disimpan oleh multer
    const filePath = req.file.path;

    // Simpan path file ke database menggunakan Sequelize
    await user.update({
      profile_picture_path: filePath
    });

    res.status(200).json({
      message: 'Upload gambar profil berhasil!',
      filePath: filePath
    });

  } catch (error) {
    console.error('Error saat upload:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});

module.exports = router;