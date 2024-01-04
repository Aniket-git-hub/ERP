import MATERIAL from '../../models/materialModel.js';
async function getMaterialService() {
    try {
        const materials = await MATERIAL.findAll();
        return materials;
    } catch (error) {
        throw error;
    }
}

export default getMaterialService;