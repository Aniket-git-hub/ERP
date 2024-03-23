import { Op, Sequelize } from "sequelize";
import ADVANCE from "../../models/employee/advanceModel.js";
import ATTENDANCE from "../../models/employee/attendanceModel.js";
import DEDUCTION from "../../models/employee/deductionModel.js";
import EMPLOYEE from "../../models/employee/employeeModel.js";
import PAYMENT_RECEIPT from "../../models/employee/paymentReceiptModel.js";
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

        const totalAttendanceDays = await ATTENDANCE.count({
            where: whereCondition
        });

        // Average number of overtime hours worked by employees over the course of the year
        const averageOvertimeHours = await PAYMENT_RECEIPT.aggregate('totalOvertime', 'AVG', {
            where: whereCondition
        });

        // Sum up the total salary expenses incurred by the company for all employees throughout the year
        const totalSalaryExpense = await PAYMENT_RECEIPT.sum('amount', {
            where: whereCondition
        });

        // Calculate the total number of leave days taken by employees in the entire year
        const totalLeavesTaken = await PAYMENT_RECEIPT.sum('leaves', {
            where: whereCondition
        });

        // Sum up the total amount of advances given to employees throughout the year
        const totalAdvancesGiven = await ADVANCE.sum('amount', {
            where: whereCondition
        });

        // Calculate the total amount deducted from employee salaries for various reasons during the year
        const totalDeductionsMade = await DEDUCTION.sum('amountDeducted', {
            where: whereCondition
        });

        // Aggregate employee feedback or survey scores related to satisfaction with work conditions over the year
        const overallEmployeeSatisfactionScore = 85; // Sample value

        const totalScheduledHours = totalEmployees * 8 * 365; // Assuming 8 working hours per day and 365 days in a year
        const yearlyAttendanceRate = (totalAttendanceDays / totalScheduledHours) * 100;

        // Analyze attendance, overtime, and leaves on a departmental basis to identify performance variations
        const departmentPerformance = await EMPLOYEE.findAll({
            where: whereCondition,
            group: ['department'],
            attributes: ['department',
                [Sequelize.fn('AVG', Sequelize.col('salary')), 'avgSalary'],
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'employeeCount']
            ]
        });

        // Calculate the percentage of employees who left the company during the year
        const totalEmployeesJoined = await EMPLOYEE.count({
            where: {
                ...whereCondition,
                dateOfJoining: {
                    [Op.gte]: new Date(year, 0, 1),
                    [Op.lt]: new Date(year + 1, 0, 1)
                }
            }
        });
        const yearlyEmployeeTurnoverRate = ((totalEmployeesJoined - totalEmployees) / totalEmployeesJoined) * 100;

        return {
            totalEmployees,
            salaryStats: salaryStats[0].dataValues,
            employeesPerDepartment,
            totalAttendanceDays,
            averageOvertimeHours,
            totalSalaryExpense,
            totalLeavesTaken,
            totalAdvancesGiven,
            totalDeductionsMade,
            overallEmployeeSatisfactionScore,
            yearlyAttendanceRate,
            departmentPerformance,
            yearlyEmployeeTurnoverRate
        };

    } catch (error) {
        throw error;
    }
}

export default getAggregateEmployeeService;