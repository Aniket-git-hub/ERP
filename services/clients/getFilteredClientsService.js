import CLIENT from '../../models/clientModel.js';
import buildWhereClause from '../../utils/buildWhereClause.js';

async function getFilteredClientsService(page = 1, limit = 10, filters = {}) {
    const offset = (page - 1) * limit;
    const whereClause = buildWhereClause(filters, ['name', 'email', 'gst', 'phone', 'createdAt', 'updatedAt'], 'createdAt')
    try {
        const items = await CLIENT.findAndCountAll({
            offset,
            limit,
            where: whereClause,
            order: [['createdAt', 'DESC']],
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

export default getFilteredClientsService