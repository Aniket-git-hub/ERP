import { Sequelize } from 'sequelize';
import ADVANCE from '../../../models/employee/advanceModel.js';
import EMPLOYEE from '../../../models/employee/employeeModel.js';
import buildWhereClause from '../../../utils/buildWhereClause.js';

async function getAdvanceService(userId, filters, operators) {
    try {
        const whereClause = buildWhereClause(filters, [
            'date',
            'fromDate',
            'toDate',
            'remainingAmount',
            'employeeId'
        ], operators);
        const advances = await ADVANCE.findAll({
            where: {
                userId,
                ...whereClause
            },
            include: [
                {
                    model: EMPLOYEE,
                    attributes: [
                        'id',
                        [Sequelize.literal('CONCAT(firstName, " ", lastName)'), 'name']
                    ]
                }
            ]
            ,
            order: [['createdAt', 'ASC']]
        });
        return advances;
    } catch (error) {
        throw error;
    }
}
export default getAdvanceService;
