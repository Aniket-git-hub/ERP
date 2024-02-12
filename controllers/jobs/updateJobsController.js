import updateJobService from "../../services/jobs/updateJobService.js";
async function updateJobController(req, res, next) {
    const { jobId } = req.params;
    const { drawingNumber, description, quantity, rate, date, size, clientId, materialId, imageUrl } = req.body;
    console.log(req.body)
    try {
        await updateJobService(jobId, drawingNumber, description, quantity, rate, date, size, clientId, materialId, imageUrl);
        res.json({ message: "Job updated successfully" });
    } catch (error) {
        next(error)
    }
}

export default updateJobController;