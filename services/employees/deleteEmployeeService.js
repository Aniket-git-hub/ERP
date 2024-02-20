import EMPLOYEE from '../../models/employee/employeeModel.js';
import CustomError from '../../utils/createError.js';

async function deleteEmployeeService(userId, employeeId) {
    try {
        const deletedEmployee = await EMPLOYEE.destroy({
            where: { userId, id: employeeId }
        });

        if (!deletedEmployee) {
            throw new CustomError('EmployeeError', "Couldn't delete employee");
        }
        return deletedEmployee;
    } catch (error) {
        throw error;
    }
}

export default deleteEmployeeService;
