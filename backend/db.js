import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('pmb', 'root', '', {
    host: 'localhost',
    dialect:  'mysql',
      define: {
        timestamps:false
      }
  })

  sequelize
  .authenticate()
  .then(() => console.log("Koneksi database berhasil!"))
  .catch((err) => console.error("Gagal koneksi:", err));
  
export default sequelize;