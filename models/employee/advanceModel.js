import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const ADVANCE = sequelize.define('advance', {
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
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    remainingAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default ADVANCE;
