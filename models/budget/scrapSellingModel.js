import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const SCRAP_SELL = sequelize.define('scrap_sell', {
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
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    buyer: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default SCRAP_SELL;
