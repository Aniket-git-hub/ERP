import JOB from '../../models/work/jobModel.js';
import CustomError from '../../utils/createError.js';
async function deleteJobService(userId, jobId) {
    try {
        const deletedJob = await JOB.destroy({
            where: { id: jobId, userId }
        });

        if (!deletedJob) {
            throw new CustomError('JobError', 'Job not found');
        }

        return deletedJob;
    } catch (error) {
        throw error;
    }
}

export default deleteJobService;
