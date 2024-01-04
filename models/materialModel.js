import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const MATERIAL = sequelize.define('Material', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hardness: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    density: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
});


export default MATERIAL;