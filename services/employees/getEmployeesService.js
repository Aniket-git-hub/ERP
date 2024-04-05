import DEPARTMENT from '../../models/employee/departmentModel.js';
import DESIGNATION from '../../models/employee/designationModel.js';
import EMPLOYEE from '../../models/employee/employeeModel.js';

async function getEmployeesService(userId) {
    try {
        const employees = await EMPLOYEE.findAll({
            where: { userId },
            include: [
                {
                    model: DESIGNATION,
                },
                {
                    model: DEPARTMENT,
                }
            ]
        });
        return employees;
    } catch (error) {
        throw error;
    }
}

export default getEmployeesService;
