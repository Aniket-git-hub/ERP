import addEmployeeService from '../../services/employees/addEmployeeService.js';

async function addEmployeeController(req, res, next) {
    const { userId } = req.user;
    try {
        const employee = await addEmployeeService(userId, req.body);
        res.send({
            employee,
            message: 'Employee added successfully'
        });
    } catch (error) {
        next(error);
    }
}
export default addEmployeeController;
