import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const OPERATION_COST = sequelize.define('operation_cost', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
});

export default OPERATION_COST;
