import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const DEPARTMENT = sequelize.define('department', {
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

export default DEPARTMENT;
