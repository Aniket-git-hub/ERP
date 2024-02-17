import EMPLOYEE from "../../models/employee/employeeModel.js";
import CustomError from "../../utils/createError.js";

async function updateEmployeeService(userId, employeeId, employeeData) {
    try {
        const employee = await EMPLOYEE.findOne({
            where: { id: employeeId, UserId: userId }
        });

        if (!employee) {
            throw new CustomError("EmployeeError", "Couldn't find employee")
        }

        const updatedEmployee = await EMPLOYEE.update(
            { ...employeeData },
            {
                where: { id: employeeId, UserId: userId }
            }
        );

        if (!updatedEmployee) {
            throw new CustomError("EmployeeError", "Couldn't update employee")
        }

        return updatedEmployee;
    } catch (error) {
        throw error;
    }
}

export default updateEmployeeService;