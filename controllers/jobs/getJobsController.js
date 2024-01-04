import getFilteredJobsService from "../../services/jobs/getFilteredJobsService.js";
async function getJobsController(req, res, next) {
    const { page = 1, limit = 10 } = req.query;
    const filters = req.query;
    try {
        const jobs = await getFilteredJobsService(parseInt(page), parseInt(limit), filters);
        res.json(jobs);
    } catch (error) {
        next(error)
    }
}

export default getJobsController;