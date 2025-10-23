import mahasiswaModel from "./data_calon_mahasiswa.js";
import pendidikanModel from "./data_pendidikan_calon_mahasiswa.js";
import orangtuaModel from "./data_orangtua_wali.js";

const CalonMahasiswa = mahasiswaModel(sequelize, DataTypes);
const DataPendidikan = pendidikanModel(sequelize, DataTypes);
const DataOrangtua = orangtuaModel(sequelize, DataTypes);

// Relasi
DataPendidikan.hasMany(CalonMahasiswa, { foreignKey: "calon_mahasiswa_id" }); 
CalonMahasiswa.belongsTo(DataPendidikan, { foreignKey: "calon_mahasiswa_id" }); // setiap Post milik 1 User

DataOrangtua.hasMany(CalonMahasiswa, { foreignKey: "calon_mahasiswa_id" }); 
CalonMahasiswa.belongsTo(DataOrangtua, { foreignKey: "calon_mahasiswa_id" }); // setiap Post milik 1 User

export default {CalonMahasiswa,DataPendidikan,DataOrangtua}