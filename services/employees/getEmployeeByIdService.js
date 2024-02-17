import EMPLOYEE from "../../models/employee/employeeModel.js";

async function getEmployeeByIdService(userId, employeeId) {
    try {
        const employee = await EMPLOYEE.findByPk(employeeId, {
            where: { UserId: userId },
        })
        return employee
    } catch (error) {
        throw error
    }
}

export default getEmployeeByIdService;