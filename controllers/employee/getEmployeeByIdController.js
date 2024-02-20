import getEmployeeByIdService from '../../services/employees/getEmployeeByIdService.js';

async function getEmployeesByIdController(req, res, next) {
    const { employeeId } = req.params;
    const { userId } = req.user;
    try {
        const employee = await getEmployeeByIdService(userId, employeeId);
        res.json({
            employee
        });
    } catch (error) {
        next(error);
    }
}
export default getEmployeesByIdController;
