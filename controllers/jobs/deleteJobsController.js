import deleteJobService from "../../services/jobs/deleteJobService.js";
async function deleteJobController(req, res, next) {
    const { jobId } = req.params;
    const { userId } = req.user;
    try {
        await deleteJobService(userId, jobId);
        res.json({
            message: 'Job deleted successfully'
        });
    } catch (error) {
        next(error)
    }
}

export default deleteJobController;