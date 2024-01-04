import MATERIAL from '../../models/materialModel.js';
async function addMaterialService(name, hardness, density) {
    try {
        const client = await MATERIAL.create({ name, hardness, density })
        return client
    } catch (err) {
        throw err
    }
}

export default addMaterialService;