import CLIENT from '../../models/clientModel.js';
import JOB from '../../models/jobModel.js';
import MATERIAL from '../../models/materialModel.js';
import buildWhereClause from '../../utils/buildWhereClause.js';

async function getFilteredJobsService(page = 1, limit = 10, filters = {}) {
    const offset = (page - 1) * limit;
    const whereClause = buildWhereClause(filters, ['drawingName', 'clientId', 'materialId', 'date', 'createdAt', 'updatedAt']);

    try {
        const items = await JOB.findAndCountAll({
            offset,
            limit,
            where: whereClause,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: CLIENT,
                    attributes: ['id', 'name', 'email', 'phone', 'gst', 'address'],
                },
                {
                    model: MATERIAL,
                    attributes: ['id', 'name', 'hardness', 'density'],
                },
            ]
        });

        const { count: totalItems, rows: itemData } = items;
        const totalPages = Math.ceil(totalItems / limit);

        return {
            totalItems,
            currentPage: page,
            totalPages,
            hasNextPage: page < totalPages,
            limit,
            countInCurrentPage: itemData.length,
            items: itemData,
        };
    } catch (error) {
        throw error;
    }
}

export default getFilteredJobsService