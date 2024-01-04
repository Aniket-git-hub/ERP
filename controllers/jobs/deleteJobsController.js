import deleteJobService from "../../services/jobs/deleteJobService.js";
async function deleteJobController(req, res, next) {
    const { jobId } = req.params;
    try {
        await deleteJobService(jobId);
        res.json({
            message: 'Job deleted successfully'
        });
    } catch (error) {
        next(error)
    }
}

export default deleteJobController;