import CLIENT from '../../models/work/clientModel.js';
import INVOICE from '../../models/work/invoiceModel.js';
import JOB from '../../models/work/jobModel.js';
import buildWhereClause from '../../utils/buildWhereClause.js';

async function getFilteredInvoiceService(
    userId,
    page = 1,
    limit = 10,
    filters = {}
) {
    const offset = (page - 1) * limit;
    const whereClause = buildWhereClause(filters, [
        'invoiceDate',
        'fromDate',
        'toDate',
        'invoiceNumber',
        'ClientId'
    ]);

    try {
        const items = await INVOICE.findAndCountAll({
            offset,
            limit,
            where: { UserId: userId, ...whereClause },
            order: [['createdAt', 'DESC']],
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
                    model: JOB,
                    attributes: ['id']
                }
            ]
        });

        const { count: totalItems, rows: itemData } = items;
        const totalPages = Math.ceil(totalItems / limit);

        const jobs = itemData.map((item) => ({
            ...item.get(),
            Jobs: item.Jobs.map((job) => job.id)
        }));

        return {
            totalItems,
            currentPage: page,
            totalPages,
            hasNextPage: page < totalPages,
            limit,
            countIncurrentPage: itemData.length,
            items: jobs
        };
    } catch (error) {
        throw error;
    }
}

export default getFilteredInvoiceService;
