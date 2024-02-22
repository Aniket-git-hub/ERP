import deleteMaterialService from '../../services/material/deleteMaterialService.js';
async function deleteMaterialController(req, res, next) {
    const { materialId } = req.params;
    const { userId } = req.user
    try {
        await deleteMaterialService(userId, materialId);
        res.json({
            message: 'Material deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

export default deleteMaterialController;
