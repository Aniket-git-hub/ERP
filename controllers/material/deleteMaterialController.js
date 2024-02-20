import deleteMaterialService from '../../services/material/deleteMaterialService.js';
async function deleteMaterialController(req, res, next) {
    const { materialId } = req.params;
    try {
        await deleteMaterialService(materialId);
        res.json({
            message: 'Material deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

export default deleteMaterialController;
