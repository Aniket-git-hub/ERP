import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const DEDUCTION = sequelize.define('deduction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    amountDeducted: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default DEDUCTION;
