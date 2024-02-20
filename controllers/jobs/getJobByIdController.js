import getJobByIdService from '../../services/jobs/getJobByIdService.js';
async function getJobsController(req, res, next) {
    const { jobId } = req.params;
    const { userId } = req.user;
    try {
        let job = await getJobByIdService(userId, jobId);
        res.json({
            job
        });
    } catch (error) {
        next(error);
    }
}

export default getJobsController;
