import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const ATTENDANCE = sequelize.define('attendance', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    checkTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    punchType: {
        type: DataTypes.ENUM('in', 'out'),
        allowNull: false
    }
});

export default ATTENDANCE;
