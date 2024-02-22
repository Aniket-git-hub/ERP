import CLIENT from '../../models/work/clientModel.js';

async function getFilteredClientsService(userId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    try {
        const items = await CLIENT.findAndCountAll({
            offset,
            limit,
            where: { userId },
            order: [['createdAt', 'DESC']]
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
            items: itemData
        };
    } catch (error) {
        throw error;
    }
}

export default getFilteredClientsService;
