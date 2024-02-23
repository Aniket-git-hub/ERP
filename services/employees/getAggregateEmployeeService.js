import { Op, Sequelize } from "sequelize";
import EMPLOYEE from "../../models/employee/employeeModel.js";
async function getAggregateEmployeeService(userId, type, year, month) {
    try {
        let whereCondition = {
            userId: userId
        };

        if (type === 'monthly') {
            whereCondition.createdAt = {
                [Op.gte]: new Date(year, month - 1, 1),
                [Op.lt]: new Date(year, month, 1)
            };
        } else if (type === 'yearly') {
            whereCondition.createdAt = {
                [Op.gte]: new Date(year, 0, 1),
                [Op.lt]: new Date(year + 1, 0, 1)
            };
        }

        // Total number of employees
        const totalEmployees = await EMPLOYEE.count({
            where: whereCondition
        });

        // Average, min, and max salary
        const salaryStats = await EMPLOYEE.findAll({
            where: whereCondition,
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('salary')), 'avgSalary'],
                [Sequelize.fn('MIN', Sequelize.col('salary')), 'minSalary'],
                [Sequelize.fn('MAX', Sequelize.col('salary')), 'maxSalary']
            ]
        });

        // Count of employees in each department
        const employeesPerDepartment = await EMPLOYEE.findAll({
            where: whereCondition,
            group: ['department'],
            attributes: ['department', [Sequelize.fn('COUNT', Sequelize.col('id')), 'employeeCount']]
        });

        return {
            totalEmployees,
            salaryStats: salaryStats[0].dataValues,
            employeesPerDepartment
        };

    } catch (error) {
        throw error;
    }
}

export default getAggregateEmployeeService;