function buildWhereClause(filters, keys) {
    const whereClause = {};
    keys.forEach(key => {
        if (filters[key]) {
            whereClause[key] = filters[key] instanceof Date ? new Date(filters[key]) : filters[key];
        }
    });
    return whereClause;
}


export default buildWhereClause