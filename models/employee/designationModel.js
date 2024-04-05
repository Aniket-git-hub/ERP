import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const DESIGNATION = sequelize.define('designation', {
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
});

export default DESIGNATION;
