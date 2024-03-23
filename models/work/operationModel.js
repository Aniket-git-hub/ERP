import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const OPERATIONS = sequelize.define('operation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default OPERATIONS;
