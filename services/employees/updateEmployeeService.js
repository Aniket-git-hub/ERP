import EMPLOYEE from '../../models/employee/employeeModel.js';
import CustomError from '../../utils/createError.js';

async function updateEmployeeService(userId, employeeId, employeeData) {
    try {

        const updatedEmployee = await EMPLOYEE.update(employeeData, {
            where: { id: employeeId, userId }
        }
        );

        if (!updatedEmployee) {
            throw new CustomError('EmployeeError', "Couldn't update employee");
        }

        const employee = await EMPLOYEE.findByPk(employeeId, {
            where: { userId }
        });

        return employee;
    } catch (error) {
        throw error;
    }
}

export default updateEmployeeService;
