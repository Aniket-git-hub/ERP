import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const EMPLOYEE = sequelize.define('employee', {
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
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true,
            len: [10, 11]
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 500]
        }
    },
    designation: {
        type: DataTypes.ENUM('manager', 'supervisor', 'Milling Operator', 'Vertical Turret Milling Operator', 'Lathe Operator'),
        allowNull: false,
    },
    department: {
        type: DataTypes.ENUM('finance', 'factory'),
        allowNull: false,
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dateOfJoining: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

export default EMPLOYEE;
