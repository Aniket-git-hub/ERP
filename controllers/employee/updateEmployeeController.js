import updateEmployeeService from '../../services/employees/updateEmployeeService.js';

async function updateEmployeeController(req, res, next) {
    const { employeeId } = req.params;
    const { userId } = req.user;
    try {
        const employee = await updateEmployeeService(
            userId,
            employeeId,
            req.body
        );
        res.json({
            employee,
            message: 'Employee updated successfully'
        });
    } catch (error) {
        next(error);
    }
}
export default updateEmployeeController;
