import getEmployeesOptionService from '../../services/employees/getEmployeesOptionService.js';

async function getEmployeesOptionController(req, res, next) {
    const { userId } = req.user;
    try {
        const employees = await getEmployeesOptionService(userId);
        res.json({
            employees
        });
    } catch (error) {
        next(error);
    }
}
export default getEmployeesOptionController;
