import JOB from '../../models/work/jobModel.js';
async function addJobService(
    userId,
    drawingNumber,
    description,
    quantity,
    date,
    size,
    clientId,
    materialId,
    imageUrl,
    operations,
) {
    try {
        const job = await JOB.create({
            drawingNumber,
            description,
            quantity,
            date,
            size,
            imageUrl,
            userId,
            clientId,
            materialId,
        });

        if (operations && operations.length > 0) {

        }
        return job;
    } catch (err) {
        throw err;
    }
}

export default addJobService;
