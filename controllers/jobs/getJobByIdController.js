import getJobByIdService from "../../services/jobs/getJobByIdService.js";
async function getJobsController(req, res, next) {
    const { jobId } = req.params;
    try {
        let job = await getJobByIdService(jobId);
        res.json({
            job
        });
    } catch (error) {
        next(error)
    }
}

export default getJobsController;