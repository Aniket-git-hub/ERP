import addJobService from '../../services/jobs/addJobService.js';

async function addJobController(req, res, next) {
    const {
        drawingNumber,
        description,
        quantity,
        size,
        clientId,
        materialId,
        date,
        imageUrl,
        operations
    } = req.body;
    const { userId } = req.user;
    try {
        const job = await addJobService(
            userId,
            drawingNumber,
            description,
            quantity,
            date,
            size,
            clientId,
            materialId,
            imageUrl,
            operations
        );
        res.status(201).json({
            job,
            message: 'New job added successfully'
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export default addJobController;