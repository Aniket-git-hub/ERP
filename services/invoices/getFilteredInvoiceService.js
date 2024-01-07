import CLIENT from "../../models/clientModel.js";
import INVOICE from "../../models/invoiceModel.js";
import JOB from "../../models/jobModel.js";
import buildWhereClause from "../../utils/buildWhereClause.js";

async function getFilteredInvoiceService(page = 1, limit = 10, filters = {}) {
    const offset = (page - 1) * limit;
    const whereClause = buildWhereClause(filters, ['invoiceDate', 'fromDate', 'toDate', 'invoiceNumber', 'ClientId'])

    try {
        const items = await INVOICE.findAndCountAll({
            offset,
            limit,
            where: whereClause,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: CLIENT,
                    attributes: ['id', 'name', 'email', 'phone', 'gst', 'address']
                },
                {
                    model: JOB,
                    attributes: ['drawingNumber', 'rate', 'quantity']
                }
            ]
        })

        const { count: totalItems, rows: itemData } = items;
        const totalPages = Math.ceil(totalItems / limit);

        return {
            totalItems,
            currentPage: page,
            totalPages,
            hasNextPage: page < totalPages,
            limit,
            countIncurrentPage: itemData.length,
            items: itemData
        }
    } catch (error) {
        throw error;
    }

}


export default getFilteredInvoiceService;