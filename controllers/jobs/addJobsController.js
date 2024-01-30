import addJobService from "../../services/jobs/addJobService.js";
async function addJobController(req, res, next) {
    try {
        const { drawingNumber, description, quantity, rate, size, clientId, materialId, date, imageUrl } = req.body;
        const job = await addJobService(drawingNumber, description, quantity, rate, date, size, clientId, materialId, imageUrl);
        res.status(201).json({
            job,
            message: "New job added successfully"
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export default addJobController;