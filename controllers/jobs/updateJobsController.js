import updateJobService from '../../services/jobs/updateJobService.js';
async function updateJobController(req, res, next) {
    const { jobId } = req.params;
    const { userId } = req.user;
    const {
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
    } = req.body;
    try {
        await updateJobService(
            jobId,
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
        );
        res.json({ message: 'Job updated successfully' });
    } catch (error) {
        next(error);
    }
}

export default updateJobController;
