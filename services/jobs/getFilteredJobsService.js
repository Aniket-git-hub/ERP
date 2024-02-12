import { Sequelize } from 'sequelize';
import CLIENT from '../../models/clientModel.js';
import JOB from '../../models/jobModel.js';
import MATERIAL from '../../models/materialModel.js';
import buildWhereClause from '../../utils/buildWhereClause.js';

async function getFilteredJobsService(page = 1, limit = null, filters = {}) {
    const offset = (page - 1) * (limit || 10);
    const whereClause = buildWhereClause(filters, [
        'ClientId',
        'MaterialId',
        'InvoiceId',
        'quantity',
        'drawingName',
        'date',
        'fromDate',
        'toDate',
        'createdAt',
        'updatedAt'
    ]);

    let excludedFields = []
    if (filters.pdf) {
        excludedFields = ['id', 'InvoiceId', 'imageUrl', 'createdAt', 'updatedAt', 'size', 'description']
    }

    try {
        const items = await JOB.findAndCountAll({
            offset,
            limit: limit || undefined,
            where: whereClause,
            order: [['date', 'DESC']],
            include: [{
                model: CLIENT,
                attributes: [
                    'id',
                    'name',
                    'email',
                    'phone',
                    'gst',
                    'address'
                ]
            }, {
                model: MATERIAL,
                attributes: ['id', 'name', 'hardness', 'density']
            }],
            attributes: {
                include: [
                    [
                        'quantity',
                        'qty'
                    ],
                    [
                        Sequelize.literal('`Job`.`quantity` * `Job`.`rate`'),
                        'total'
                    ],
                ],
                exclude: ['ClientId', 'MaterialId', 'quantity', ...excludedFields]
            }
        });

        const { count: totalItems, rows: itemData } = items;
        const totalPages = Math.ceil(totalItems / (limit || 10))

        return {
            totalItems,
            currentPage: page,
            totalPages,
            hasNextPage: page < totalPages,
            limit,
            countInCurrentPage: itemData.length,
            items: itemData
        }
    } catch (error) {
        throw error;
    }
}

export default getFilteredJobsService;
