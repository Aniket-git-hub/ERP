import getMaterialService from '../../services/material/getMaterialService.js';
async function getMaterialController(req, res, next) {
    const { userId } = req.user;
    try {
        const materials = await getMaterialService(userId);
        res.json({
            materials,
            message: 'All materials'
        });
    } catch (error) {
        next(error);
    }
}

export default getMaterialController;
