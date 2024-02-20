import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const MATERIAL = sequelize.define('Material', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    hardness: {
        type: DataTypes.STRING,
        allowNull: true
    },
    density: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
});

export default MATERIAL;
