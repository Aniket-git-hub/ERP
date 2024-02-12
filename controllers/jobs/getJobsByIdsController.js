import getJobByIdsService from "../../services/jobs/getJobsbyIdsService.js";
async function getJobsByIdsController(req, res, next) {
    const jobIds = req.query.jobIds.split(',').map(Number);
    try {
        let jobs = await getJobByIdsService(jobIds);
        res.json({
            jobs
        });
    } catch (error) {
        next(error)
    }
}

export default getJobsByIdsController;