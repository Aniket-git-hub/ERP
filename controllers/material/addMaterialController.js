import addMaterialService from "../../services/material/addMaterialService.js";
async function addMaterialController(req, res, next) {
    try {
        const { name, hardness, density } = req.body;
        const material = await addMaterialService(name, hardness, density);
        res.status(201).json({
            material,
            message: "New material added successfully"
        })
    } catch (error) {
        next(error)
    }
}

export default addMaterialController;