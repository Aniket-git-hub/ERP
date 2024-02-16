import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const BUDGET = sequelize.define('budget', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

export default BUDGET;
