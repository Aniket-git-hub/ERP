import JOB from '../../models/jobModel.js';
import CustomError from "../../utils/createError.js";
async function updateJobService(jobId, userId, drawingNumber, description, quantity, millingRate, drillingRate, date, size, clientId, materialId, imageUrl) {
    try {
        const updatedJob = await JOB.update(
            {
                drawingNumber,
                description,
                quantity,
                millingRate,
                drillingRate,
                date,
                size,
                ClientId: clientId,
                MaterialId: materialId,
                imageUrl,
            },
            {
                where: { id: jobId, UserId: userId },
                returning: true,
                plain: true,
            }
        );

        if (!updatedJob) {
            throw new CustomError("JobError", 'Job not found');
        }

        return updatedJob[1];
    } catch (error) {
        throw error;
    }
}

export default updateJobService;