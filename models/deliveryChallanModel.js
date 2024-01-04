import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import CLIENT from './clientModel.js';

const DELIVERY_CHALLAN = sequelize.define('DeliveryChallan', {
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

DELIVERY_CHALLAN.belongsToMany(CLIENT)
CLIENT.hasMany(DELIVERY_CHALLAN)

export default DELIVERY_CHALLAN;