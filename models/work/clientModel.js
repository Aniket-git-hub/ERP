import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const CLIENT = sequelize.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    gst: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});


export default CLIENT;
