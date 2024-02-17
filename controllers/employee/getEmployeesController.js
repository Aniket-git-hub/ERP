import getEmployeesService from "../../services/employees/getEmployeesService.js";

async function getEmployeesController(req, res, next) {
    const { userId } = req.user
    try {
        const employees = await getEmployeesService(userId)
        res.json({
            employees
        })
    } catch (error) {
        next(error)
    }
}
export default getEmployeesController;