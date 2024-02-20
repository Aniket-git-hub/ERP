import deleteEmployeeService from '../../services/employees/deleteEmployeeService.js';

async function deleteEmployeeController(req, res, next) {
    const { userId } = req.user;
    const { employeeId } = req.params;
    try {
        const deletedEmployee = await deleteEmployeeService(userId, employeeId);
        res.json({
            deletedEmployee,
            message: 'Employee deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}
export default deleteEmployeeController;
