import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const INCOME = sequelize.define('income', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    period: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

export default INCOME;
