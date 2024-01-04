import MATERIAL from '../../models/materialModel.js';
import CustomError from '../../utils/createError.js';
async function deleteMaterialService(materialId) {
    try {
        const deletedMaterial = await MATERIAL.destroy({
            where: { id: materialId },
        });

        if (!deletedMaterial) {
            throw new CustomError("MaterialError", "Material not found")
        }

        return deletedMaterial;
    } catch (error) {
        throw error;
    }
}

export default deleteMaterialService;