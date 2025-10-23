
import express, { response } from "express"
const router = express.Router();
import User from "../models/users.js"
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', function(req, res) {
res.sendFile(path.join(__dirname,"..", "..", "frontend", "page", "authentication", "login.html"));
});

router.post('/auth', async function (req,res)  {
  // #TODO: [] buat validasi untuk user yang login 
 
  try{

     const {username,password} = req.body
// Validasi input
    if (!username) {
      return res.status(400).json({ success: false, message: "Username wajib diisi" });
    }
    if (!password) {
      return res.status(400).json({ success: false, message: "Password wajib diisi" });
    }

     // Cari user berdasarkan username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User tidak ditemukan" });
    }

       // Cek password (jika password di-hash di database)
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(401).json({ success: false, message: "Password salah" });
    // }
            // Jika lolos
    return res.json({
      success: true,
      message: "Login berhasil",
      data: {
        id: user.id,
        username: user.username,
        nama_lengkap: user.nama_lengkap
        // jangan kirim password!
      },
    });
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
  }

})

export default router;