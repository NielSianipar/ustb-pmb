import {Sequelize,DataTypes} from 'sequelize';
import sequelize from '../db.js';

const DataOrangTuaMahasiswa = sequelize.define('data_orangtua_mahasiswa',{
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
  nama_lengkap_ayah:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  kondisi:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  nama_lengkap_ibu:{
    type:DataTypes.STRING,
    allowNull:false
  },
  pendidikan_terakhir_ayah: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pendidikan_terakhir_ibu:{
    type:DataTypes.STRING,
    allowNull:false
  },
  pekerjaan_ayah:{
    type:DataTypes.STRING,
    allowNull:false
  },
  penghasilan_ayah:{
    type:DataTypes.STRING,
    allowNull:false
  },  
  pekerjaan_ibu:{
    type:DataTypes.STRING,
    allowNull:false
  },
  penghasilan_ibu:{
    type:DataTypes.STRING,
    allowNull:false
  },
  alamat_orangtua:{
    type:DataTypes.STRING,
    allowNull:false
  },

  nomor_hp_orangtua:{
    type:DataTypes.STRING,
    allowNull:false
  },
},
  {
    timestamps:false, // enables timestamps);
    freezeTableName: true // <--- penting
  });

export default DataOrangTuaMahasiswa