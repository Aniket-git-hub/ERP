import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const USER = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobileNumber: {
        type: DataTypes.STRING(11),
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [10, 11]
        }
    },
    companyName: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    accountStatus: {
        type: DataTypes.ENUM('frozen', 'blocked', 'active'),
        defaultValue: 'active',
    },
    failedOtpAttempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    emailVerificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

export default USER;