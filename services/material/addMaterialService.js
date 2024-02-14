import MATERIAL from '../../models/materialModel.js';
async function addMaterialService(userId, name, hardness, density) {
    try {
        const client = await MATERIAL.create({ UserId: userId, name, hardness, density })
        return client
    } catch (err) {
        throw err
    }
}

export default addMaterialService;