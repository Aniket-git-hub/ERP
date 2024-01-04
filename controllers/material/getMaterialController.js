import getMaterialService from "../../services/material/getMaterialService.js";
async function getMaterialController(req, res, next) {
    try {
        const materials = await getMaterialService();
        res.json({
            materials,
            message: "All materials"
        });
    } catch (error) {
        next(error)
    }
}

export default getMaterialController;