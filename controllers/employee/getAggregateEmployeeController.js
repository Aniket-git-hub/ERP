import getAggregateEmployeeService from "../../services/employees/getAggregateEmployeeService.js";

async function getAggregateEmployeeController(req, res, next) {
    const { userId } = req.user;
    const { type, month, year } = req.query;
    try {
        const aggregate = await getAggregateEmployeeService(userId, type, parseInt(year), parseInt(month))
        res.json(aggregate);
    } catch (error) {
        next(error)
    }
}

export default getAggregateEmployeeController