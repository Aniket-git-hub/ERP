import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const JOB = sequelize.define('Job', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    drawingNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    millingRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    drillingRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    rate: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.millingRate + this.drillingRate
        },
        set(value) {
            throw new Error('Do not try to set the `rate` value!');
        }
    },
    size: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    operations: {
        type: DataTypes.ENUM('milling', 'drilling', 'both'),
        allowNull: false,
        defaultValue: 'milling',
    },
});

export default JOB;
