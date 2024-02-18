import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const PAYMENT_RECEIPT = sequelize.define('payment_receipt', {
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
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalHoursWorked: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalOvertime: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    leaves: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    modeOfPayment: {
        type: DataTypes.ENUM("OnlinePayment", "Cash", "Cheque"),
        allowNull: false,
        defaultValue: "Cash"
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default PAYMENT_RECEIPT;
