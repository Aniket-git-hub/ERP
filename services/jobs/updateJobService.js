import JOB from '../../models/jobModel.js';
import CustomError from "../../utils/createError.js";
async function updateJobService(jobId, drawingNumber, description, quantity, rate, date, size, clientId, materialId, imageUrl) {
    try {
        const updatedJob = await JOB.update(
            {
                drawingNumber,
                description,
                quantity,
                rate,
                date,
                size,
                ClientId: clientId,
                MaterialId: materialId,
                imageUrl,
            },
            {
                where: { id: jobId },
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