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
    totalQuantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    cGstPercentage: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    iGstPercentage: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    sGstPercentage: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    totalAmountBeforeTax: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    cGstAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    iGstAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    sGstAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    totalTaxAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    totalAmountAfterTax: {
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
