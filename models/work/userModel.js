import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const USER = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, Infinity]
        }
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [10, 11]
        }
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [1, 30]
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 500]
        }
    }
});

export default USER;
