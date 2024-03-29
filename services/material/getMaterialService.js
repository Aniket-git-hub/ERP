import MATERIAL from '../../models/work/materialModel.js';
async function getMaterialService(userId) {
    try {
        const materials = await MATERIAL.findAll({
            where: { userId }
        });
        return materials;
    } catch (error) {
        throw error;
    }
}

export default getMaterialService;
