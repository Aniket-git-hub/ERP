import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const ATTENDANCE = sequelize.define('attendance', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    inTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    outTime: {
        type: DataTypes.TIME,
        allowNull: false,
    }
});

export default ATTENDANCE;
