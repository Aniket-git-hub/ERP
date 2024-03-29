import { Sequelize } from 'sequelize';
import CLIENT from '../../models/work/clientModel.js';
import JOB from '../../models/work/jobModel.js';
import MATERIAL from '../../models/work/materialModel.js';
import buildWhereClause from '../../utils/buildWhereClause.js';

async function getFilteredJobsService(
    userId,
    page = 1,
    limit = null,
    filters = {}
) {
    const offset = (page - 1) * (limit || 10);
    const whereClause = buildWhereClause(filters, [
        'clientId',
        'materialId',
        'invoiceId',
        'quantity',
        'drawingName',
        'date',
        'fromDate',
        'toDate',
        'createdAt',
        'updatedAt'
    ]);

    let excludedFields = [];
    if (filters.pdf) {
        excludedFields = [
            'id',
            'invoiceId',
            'imageUrl',
            'createdAt',
            'updatedAt',
            'size',
            'description'
        ];
    }

    try {
        const items = await JOB.findAndCountAll({
            offset,
            limit: limit || undefined,
            where: {
                userId,
                ...whereClause
            },
            order: [['date', 'DESC']],
            include: [
                {
                    model: CLIENT,
                    attributes: [
                        'id',
                        'name',
                        'email',
                        'phone',
                        'gst',
                        'address'
                    ]
                },
                {
                    model: MATERIAL,
                    attributes: ['id', 'name', 'hardness', 'density']
                }
            ],
            attributes: {
                include: [
                    ['quantity', 'qty'],
                    [
                        Sequelize.literal(
                            '`Job`.`quantity` * (`Job`.`millingRate` + `Job`.`drillingRate`)'
                        ),
                        'total'
                    ]
                ],
                exclude: [
                    'ClientId',
                    'MaterialId',
                    'quantity',
                    ...excludedFields
                ]
            }
        });

        const { count: totalItems, rows: itemData } = items;
        const totalPages = Math.ceil(totalItems / (limit || 10));

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

export default getFilteredJobsService;
