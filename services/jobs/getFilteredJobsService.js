import { Sequelize } from 'sequelize';
import CLIENT from '../../models/clientModel.js';
import JOB from '../../models/jobModel.js';
import MATERIAL from '../../models/materialModel.js';
import buildWhereClause from '../../utils/buildWhereClause.js';

async function getFilteredJobsService(page = 1, limit = 10, filters = {}) {
    const offset = (page - 1) * limit;
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

    let includedModel = []
    if ((!filters.pdf && filters.Client == undefined) || (filters.pdf && filters.Client == undefined)) {
        includedModel = [...includedModel, {
            model: CLIENT,
            attributes: [
                'id',
                'name',
                'email',
                'phone',
                'gst',
                'address'
            ]
        }]
    }
    if ((!filters.pdf && filters.Material == undefined) || (filters.pdf && filters.Material == undefined)) {
        includedModel = [...includedModel, {
            model: MATERIAL,
            attributes: ['id', 'name', 'hardness', 'density']
        }]
    }

    try {
        const items = await JOB.findAndCountAll({
            offset,
            limit,
            where: whereClause,
            order: [['createdAt', 'DESC']],
            include: [...includedModel],
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
        const totalPages = Math.ceil(totalItems / limit);

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
