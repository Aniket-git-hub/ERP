import { Sequelize } from 'sequelize';
import CLIENT from '../../models/work/clientModel.js';
import JOB from '../../models/work/jobModel.js';
import MATERIAL from '../../models/work/materialModel.js';
import OPERATION_COST from '../../models/work/operationCostModel.js';
import OPERATIONS from '../../models/work/operationModel.js';
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

        const [totalItems, items] = await Promise.all([
            getTotalItems(userId, whereClause),
            getItems(userId, whereClause, offset, limit, excludedFields)
        ])

        const totalPages = Math.ceil(totalItems / (limit || 10));

        return {
            totalItems,
            currentPage: page,
            totalPages,
            hasNextPage: page < totalPages,
            limit,
            countInCurrentPage: items.length,
            items
        };
    } catch (error) {
        throw error;
    }

    async function getTotalItems() {
        const totalItems = await JOB.count({
            where: { userId, ...whereClause }, col: 'id'
        });

        return totalItems
    }

    async function getItems() {
        return await JOB.findAll({
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
                },
                {
                    model: OPERATION_COST,
                    attributes: ['id', 'cost'],
                    include: [
                        {
                            model: OPERATIONS,
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ],
            attributes: {
                include: [
                    ['quantity', 'qty'],
                    [
                        Sequelize.literal(
                            '`Job`.`quantity` * (SELECT SUM(`cost`) FROM `operation_costs` WHERE `operation_costs`.`jobId` = `Job`.`id`)'
                        ),
                        'total'
                    ],
                    // [
                    //     Sequelize.literal(
                    //         '(SELECT GROUP_CONCAT(o.name SEPARATOR ",") FROM `JobOperation` jo JOIN operations o ON jo.operationId = o.id WHERE jo.jobId = `Job`.`id`)'
                    //     ),
                    //     'operations'
                    // ],
                ],
                exclude: [
                    'ClientId',
                    'MaterialId',
                    'quantity',
                    ...excludedFields
                ]
            }
        });
    }
}

export default getFilteredJobsService;


