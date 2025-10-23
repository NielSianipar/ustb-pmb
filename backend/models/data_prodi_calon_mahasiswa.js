import {Sequelize,DataTypes} from 'sequelize';
import sequelize from '../db.js';

const DataProdiMahasiswa = sequelize.define('data_prodi_calon_mahasiswa',{
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
  pilihan_satu:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  pilihan_dua:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  jalur_masuk:{
    type: DataTypes.STRING,
    allowNull: true,
  },
},
  {
    timestamps:false, // enables timestamps);
    freezeTableName: true // <--- penting

  });

export default DataProdiMahasiswa