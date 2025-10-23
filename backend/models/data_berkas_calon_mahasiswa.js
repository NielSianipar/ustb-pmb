import {Sequelize,DataTypes} from 'sequelize';
import sequelize from '../db.js';

const DataBerkasMahasiswa = sequelize.define('data_berkas_calon_mahasiswa',{
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
  ijazah: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kk:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  ktp:{
    type: DataTypes.STRING,
    allowNull: true,
  },
    sertifikat:{
    type: DataTypes.STRING,
    allowNull: true,
  },
},
  {
    timestamps:false, // enables timestamps);
    freezeTableName: true // <--- penting

  });

export default DataBerkasMahasiswa