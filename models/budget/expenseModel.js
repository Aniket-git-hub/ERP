import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const EXPENSE = sequelize.define('expense', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

export default EXPENSE;
