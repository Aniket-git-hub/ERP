import updateMaterialService from '../../services/material/updateMaterialService.js';

async function updateMaterialController(req, res, next) {
    const { materialId } = req.params;
    const { name, hardness, density } = req.body;
    const { userId } = req.user;
    try {
        await updateMaterialService(
            userId,
            materialId,
            name,
            hardness,
            density
        );
        res.json({
            message: 'Material updated successfully'
        });
    } catch (error) {
        next(error);
    }
}

export default updateMaterialController;
