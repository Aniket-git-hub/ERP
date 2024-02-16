import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const DELIVERY_CHALLAN = sequelize.define('delivery_challan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    challanNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    challanDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    deliveryThrough: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    invoice: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

export default DELIVERY_CHALLAN;