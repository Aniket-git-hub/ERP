import ADVANCE from "../../../models/employee/advanceModel.js";
import buildWhereClause from "../../../utils/buildWhereClause.js";

async function getAdvanceService(userId, employeeId, filters) {
    try {
        const whereClause = buildWhereClause(filters, [
            'date',
            'fromDate',
            'toDate',
            'remainingAmount'
        ])
        const advances = await ADVANCE.findAll({
            where: {
                UserId: userId,
                employeeId,
                ...whereClause
            },
            order: [['createdAt', 'ASC']],
        })
        return advances
    } catch (error) {
        throw error
    }
}

export default getAdvanceService;