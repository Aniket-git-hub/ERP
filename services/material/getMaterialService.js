import MATERIAL from '../../models/materialModel.js';
async function getMaterialService(userId) {
    try {
        const materials = await MATERIAL.findAll({
            where: { userId: userId }
        });
        return materials;
    } catch (error) {
        throw error;
    }
}

export default getMaterialService;