import getAggregateJobService from "../../services/jobs/getAggregateJobService.js";

async function getAggregateJobController(req, res, next) {
    const { userId } = req.user
    const { type, month, year } = req.query
    try {
        const aggregate = await getAggregateJobService(userId, type, parseInt(year), parseInt(month))
        res.json(aggregate)
    } catch (err) {
        next(err)
    }
}

export default getAggregateJobController;