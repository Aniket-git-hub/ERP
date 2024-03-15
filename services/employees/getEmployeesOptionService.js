import { Sequelize } from "sequelize";
import EMPLOYEE from "../../models/employee/employeeModel.js";

async function getEmployeesOptionService(userId) {
    try {
        const employeesOptions = await EMPLOYEE.findAll({
            where: {
                userId
            },
            attributes: [
                ['id', 'value'],
                [Sequelize.literal('CONCAT(firstName, " ", lastName)'), 'label'],
            ]
        });

        return employeesOptions;
    } catch (error) {
        throw error
    }
}

export default getEmployeesOptionService;