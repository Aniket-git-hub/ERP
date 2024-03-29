import MATERIAL from '../../models/work/materialModel.js';
async function addMaterialService(userId, name, hardness, density) {
    try {
        const client = await MATERIAL.create({
            userId,
            name,
            hardness,
            density
        });
        return client;
    } catch (err) {
        throw err;
    }
}

export default addMaterialService;
