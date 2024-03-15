import { Op } from 'sequelize';

const operatorMapping = {
    'eq': Op.eq,
    'ne': Op.ne,
    'gt': Op.gt,
    'lt': Op.lt
    // Add more operators as needed
};

function buildWhereClause(filters, keys, operators = {}, dateField = 'date') {
    const whereClause = {};

    if (Object.keys(filters).length === 0) {
        return null;
    }

    keys.forEach((key) => {
        if (filters[key] && key !== 'fromDate' && key !== 'toDate') {
            const operator = operatorMapping[operators[key]] || Op.eq; // Use the provided operator or default to Op.eq
            whereClause[key] = {
                [operator]: filters[key] instanceof Date ? new Date(filters[key]) : filters[key]
            };
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