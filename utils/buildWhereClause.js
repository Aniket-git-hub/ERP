import { Op } from 'sequelize';

function buildWhereClause(filters, keys, dateField = 'date') {
    const whereClause = {};

    keys.forEach(key => {
        if (filters[key] && key !== 'fromDate' && key !== 'toDate') {
            whereClause[key] = filters[key] instanceof Date ? new Date(filters[key]) : filters[key];
        }
    });

    if (filters.fromDate || filters.toDate) {
        whereClause[dateField] = {};
        if (filters.fromDate) {
            whereClause[dateField][Op.gte] = new Date(filters.fromDate);
        }
        if (filters.toDate) {
            whereClause[dateField][Op.lte] = new Date(filters.toDate);
        }
    }

    return whereClause;
}


export default buildWhereClause;