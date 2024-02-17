import EMPLOYEE from "../../models/employee/employeeModel.js";

async function addEmployeeService(userId, employeeData) {
    try {
        const employee = await EMPLOYEE.create({ UserId: userId, ...employeeData });
        return employee
    } catch (error) {
        throw error;
    }
}
export default addEmployeeService;