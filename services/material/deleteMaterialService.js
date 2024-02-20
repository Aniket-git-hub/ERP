import MATERIAL from '../../models/work/materialModel.js';
import CustomError from '../../utils/createError.js';
async function deleteMaterialService(userId, materialId) {
    try {
        const deletedMaterial = await MATERIAL.destroy({
            where: {
                userId,
                id: materialId
            }
        });

        if (!deletedMaterial) {
            throw new CustomError('MaterialError', 'Material not found');
        }

        return deletedMaterial;
    } catch (error) {
        throw error;
    }
}

export default deleteMaterialService;
