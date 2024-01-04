import JOB from '../../models/jobModel.js';
import CustomError from '../../utils/createError.js';
async function deleteJobService(jobId) {
    try {
        const deletedJob = await JOB.destroy({
            where: { id: jobId },
        });

        if (!deletedJob) {
            throw new CustomError("JobError", "Job not found");
        }

        return deletedJob;
    } catch (error) {
        throw error;
    }
}

export default deleteJobService;