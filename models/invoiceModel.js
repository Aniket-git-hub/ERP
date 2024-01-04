import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const INVOICE = sequelize.define('Invoice', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    invoiceDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    billedTo: {
        type: DataTypes.INTEGER, // Foreign key reference to the Client model
        allowNull: false,
    },
    totalQuantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    taxAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
});


export default INVOICE;
