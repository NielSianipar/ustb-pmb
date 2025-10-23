import {Sequelize,DataTypes} from 'sequelize';
import sequelize from '../db.js';

const DataPendidikanCalonMahasiswa = sequelize.define('data_pendidikan_calon_mahasiswa',{
   id:{
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
  }, 
  calon_mahasiswa_id: {  // foreign key
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "data_calon_mahasiswa", // nama tabel tujuan
      key: "id"
    },
  },
  asal_sekolah:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  jurusan:{
    type:DataTypes.STRING,
    allowNull:false
  },
  tahun_lulus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nomor_ijazah:{
    type:DataTypes.STRING,
    allowNull:false
  },
  nilai_rapor:{
    type:DataTypes.STRING,
    allowNull:false
  },
},
  {
    timestamps:false, // enables timestamps);
    freezeTableName: true // <--- penting
  });

export default DataPendidikanCalonMahasiswa 