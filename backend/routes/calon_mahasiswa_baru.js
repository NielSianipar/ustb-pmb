import express from "express"
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

import DataCalonMahasiswaBaru from "../models/data_calon_mahasiswa.js";
import DataPendidikanCalonMahasiswa from "../models/data_pendidikan_calon_mahasiswa.js";
import DataOrangTuaMahasiswa from "../models/data_orangtua_wali.js";
import DataBerkasCalonMahasiswa from "../models/data_berkas_calon_mahasiswa.js";
import DataProdiMahasiswa from "../models/data_prodi_calon_mahasiswa.js";

// #NOTE Tambah Data Calon Mahasiswa Baru
// #NOTE Ubah nama route menjadi daftar/spesifik nama yg pas

router.post('/daftar', async (req, res) => {
  try {
    const dataMahasiswaCreate = await DataCalonMahasiswaBaru.create(req.body);
    req.session.calon_mahasiswa_id = dataMahasiswaCreate.id
      
    req.session.save(err => {
        if(err) console.error("session save error", err)
            res.status(201).json({
        status: "success",
        message: "Data mahasiswa berhasil dibuat",
        data: dataMahasiswaCreate,
        id: dataMahasiswaCreate.id
      });
    })
  } catch (error) {
    console.error("Error creating mahasiswa:", error);

    // Cek error dari Sequelize
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeDatabaseError') {
      const errors = error.errors ? error.errors.map(e => ({
        field: e.path,
        message: e.message
      })) : [{ message: error.message }];

      return res.status(400).json({
        status: "fail",
        message: "Validasi data gagal",
        errors: errors
      });
    }

    // Error lainnya
    return res.status(500).json({
    status: "error",
      message: "Terjadi kesalahan server",
    });
  }

})

// #NOTE Tambah Data Pendidikan Calon Mahasiswa Baru
router.post('/data-pendidikan', async (req,res)=>{
    try{
       const calonMahasiswaId = req.session.calon_mahasiswa_id;

        console.log("Session sekarang:", req.session);
        if (!calonMahasiswaId) {
          return res.status(400).json({
            status: "fail",
            message: "Session mahasiswa belum ada, silakan daftar dulu"
          });
     }
        const dataPendidikanMahasiswaCreate = await DataPendidikanCalonMahasiswa.create({
            ...req.body,
            calon_mahasiswa_id:calonMahasiswaId
    })
        return res.status(201).json({
            status:"success",
            message:"Data Pendidikan Mahasiswa Berhasil dibuat",
            data:dataPendidikanMahasiswaCreate
        })
    }catch(error){
        console.error("Error creating data pendidikan mahasiswa:",error);

        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeValidationError'){
            const errors = error.errors ? error.errors.map(e => ({
                field : e.path,
                message : e.message
            })) : [{message: error.message}]
            
            return res.status(400).json({
                status:"fail",
                message:"Validasi data gagal",
                errors:errors
            })
 
    }
    // Error lainnya
    return res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan server",
    });
        }
})

// #NOTE Tambah Data Oranguta Calon Mahasiswa Baru
// #TODO MASIH ADA ERROR DISINI
// #TODO SESSION BERAKHIR DISINI APA SOLUSINYA ?

router.post('/data-orangtua', async (req,res)=>{
    try{
       const calonMahasiswaId = req.session.calon_mahasiswa_id;

        if (!calonMahasiswaId) {
          return res.status(400).json({
            status: "fail",
            message: "Session mahasiswa belum ada, silakan daftar dulu"
          });
     }
        const dataOrangtuaMahasiswaCreate = await DataOrangTuaMahasiswa.create({
            ...req.body,
            calon_mahasiswa_id:calonMahasiswaId
    })
        return res.status(201).json({
            status:"success",
            message:"Data Orangtua Mahasiswa Berhasil dibuat",
            data:dataOrangtuaMahasiswaCreate
        })
    }catch(error){
        console.error("Error creating data orangtua mahasiswa:",error);

        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeValidationError'){
            const errors = error.errors ? error.errors.map(e => ({
                field : e.path,
                message : e.message
            })) : [{message: error.message}]
            
            return res.status(400).json({
                status:"fail",
                message:"Validasi data gagal",
                errors:errors
            })
    }
    // Error lainnya
    return res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan server",
    });
        }
})

router.post('/data-prodi', async(req,res) => {
  try{
    const calonMahasiswaId = req.session.calon_mahasiswa_id;

        if (!calonMahasiswaId) {
          return res.status(400).json({
            status: "fail",
            message: "Session mahasiswa belum ada, silakan daftar dulu"
          });
     }

      const dataProdiMahasiswaCreate = await DataProdiMahasiswa.create({
            ...req.body,
            calon_mahasiswa_id:calonMahasiswaId
      })
        return res.status(201).json({
            status:"success",
            message:"Data Orangtua Mahasiswa Berhasil dibuat",
            data:dataProdiMahasiswaCreate
        })
      
    }catch(error){
        console.error("Error creating data orangtua mahasiswa:",error);

        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeValidationError'){
            const errors = error.errors ? error.errors.map(e => ({
                field : e.path,
                message : e.message
            })) : [{message: error.message}]
            
            return res.status(400).json({
                status:"fail",
                message:"Validasi data gagal",
                errors:errors
            })
    }
    // Error lainnya
    return res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan server",
    });
        }
})

// Simpan file di folder berdasarkan id mahasiswa (dari session)
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const calonMahasiswaId = req.session.calon_mahasiswa_id;

      if (!calonMahasiswaId) {
        return cb(new Error("Session calon_mahasiswa_id tidak ditemukan"), null);
      }

      // Cari nama mahasiswa berdasarkan id
      const mahasiswa = await DataCalonMahasiswaBaru.findOne({
        where: { id: calonMahasiswaId },
      });

      if (!mahasiswa) {
        return cb(new Error("Mahasiswa tidak ditemukan"), null);
      }

      // Buat folder sesuai nama (contoh: uploads/Budi_Santoso/)
      const folderName = mahasiswa.nama_lengkap.replace(/\s+/g, "_"); // ganti spasi dengan _
      const dir = path.join("uploads", folderName);

      // Pastikan folder ada
      fs.mkdirSync(dir, { recursive: true });

      cb(null, dir);
    } catch (err) {
      cb(err, null);
    }
  },
  filename: function (req, file, cb) {
    // Simpan hanya nama file unik
    const uniqueName = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
  // Filter file (opsional)
const fileFilter = (req, file, cb) => {
  const allowed = [".png", ".jpg", ".jpeg", ".pdf"];
  if (allowed.includes(path.extname(file.originalname).toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed"), false);
  }
};

const upload = multer({ 
  storage: storage, fileFilter,  limits: {
    fileSize: 1 * 1024 * 1024 // 1 MB
  }});

router.post("/data-berkas",
  upload.fields([
    { name: "ijazah", maxCount: 1 },
    { name: "kk", maxCount: 1 },
    { name: "ktp", maxCount: 1 },
    { name: "sertifikat", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      console.log("Files:", req.files);

      // Simpan path file ke DB (contoh pakai Sequelize)
      const calonMahasiswaId = req.session.calon_mahasiswa_id;
      const dataBerkas = {
        calon_mahasiswa_id: 19,
        ijazah: req.files.ijazah ? req.files.ijazah[0].path : null,
        kk: req.files.kk ? req.files.kk[0].path : null,
        ktp: req.files.ktp ? req.files.ktp[0].path : null,
        sertifikat: req.files.sertifikat ? req.files.sertifikat[0].path : null,
      };

      // contoh simpan:
      const saved = await DataBerkasCalonMahasiswa.create(dataBerkas);

      return res.status(201).json({
        status: "success",
        message: "Berkas berhasil diupload",
        data: saved
      });
    } catch (error) {
      console.error("Error upload berkas:", error);
      res.status(500).json({ status: "error", message: "Terjadi kesalahan server" });
    }
  }
);

export default router;