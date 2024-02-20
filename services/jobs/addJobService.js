import JOB from '../../models/work/jobModel.js';
async function addJobService(
    userId,
    drawingNumber,
    description,
    quantity,
    millingRate,
    drillingRate,
    date,
    size,
    clientId,
    materialId,
    imageUrl
) {
    try {
        const job = await JOB.create({
            drawingNumber,
            description,
            quantity,
            millingRate,
            drillingRate,
            date,
            size,
            imageUrl,
            userId,
            clientId,
            materialId
        });
        return job;
    } catch (err) {
        throw err;
    }
}

export default addJobService;
