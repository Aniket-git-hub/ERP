import MATERIAL from '../../models/materialModel.js';
import CustomError from '../../utils/createError.js';

async function updateMaterialService(userId, materialId, name, hardness, density) {
    try {
        const updatedMaterial = await MATERIAL.update(
            { name, hardness, density },
            {
                where: { id: materialId, UserId: userId },
                returning: true,
                plain: true,
            }
        );

        if (!updatedMaterial) {
            throw new CustomError("MaterialError", 'Material not found')
        }

        return updatedMaterial[1];
    } catch (error) {
        throw error;
    }
}

export default updateMaterialService;