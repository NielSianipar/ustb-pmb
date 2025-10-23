import {Sequelize,DataTypes} from 'sequelize';
import sequelize from '../db.js';

const Users = sequelize.define('users',{
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  nama_lengkap:{
    type: DataTypes.STRING,
    allowNull: true,
  },
    role:{
    type: DataTypes.STRING,
    allowNull: true,
  },
},
  {
    timestamps:false, // enables timestamps);
  });

export default Users