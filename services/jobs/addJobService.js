import JOB from '../../models/jobModel.js';
async function addJobService(drawingNumber, description, quantity, rate, date, size, clientId, materialId, imageUrl) {
    try {
        const job = await JOB.create({
            drawingNumber,
            description,
            quantity,
            rate,
            date,
            size,
            imageUrl,
            ClientId: clientId,
            MaterialId: materialId
        })
        return job
    } catch (err) {
        throw err
    }
}

export default addJobService;