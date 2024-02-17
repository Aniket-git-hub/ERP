import EMPLOYEE from "../../models/employee/employeeModel.js";

async function getEmployeesService(userId) {
    try {
        const employees = await EMPLOYEE.findAll({
            where: { UserId: userId }
        })
        return employees
    } catch (error) {
        throw error
    }
}

export default getEmployeesService;