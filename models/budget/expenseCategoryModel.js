import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const EXPENSE_CATEGORY = sequelize.define('expense_category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default EXPENSE_CATEGORY;
