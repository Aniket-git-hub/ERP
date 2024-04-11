import { Sequelize } from 'sequelize';
import sequelize from '../../../config/database.js';
import ATTENDANCE from '../../../models/employee/attendanceModel.js';
import EMPLOYEE from '../../../models/employee/employeeModel.js';
import buildWhereClause from '../../../utils/buildWhereClause.js';


async function getFilteredAttendanceService(
    userId,
    page = 1,
    limit = 10,
    filters = {}
) {
    const offset = (page - 1) * (limit);
    const whereClause = buildWhereClause(filters, [
        'employeeId',
        'date',
        'checkInTime',
        'checkOutTime'
    ]);

    try {
        const [totalItems, items] = await Promise.all([
            getTotalItems(userId, whereClause),
            getItems(userId, whereClause, offset, limit)
        ])

        items.forEach(item => {
            item.employee.name = `${item.employee.firstName} ${item.employee.lastName}`;
        });

        const totalPages = Math.ceil(totalItems / (limit));
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
        let whereClause = 'userId = :userId';
        let replacements = { userId: userId };

        if (filters.employeeId) {
            whereClause += ' AND employeeId = :employeeId';
            replacements.employeeId = filters.employeeId;
        }

        if (filters.date) {
            whereClause += ' AND DATE(checkTime) = :date';
            replacements.date = filters.date;
        }


        const totalItems = await sequelize.query(
            `SELECT COUNT(DISTINCT(DATE(checkTime))) as total FROM attendances WHERE ${whereClause}`,
            {
                replacements: replacements,
                type: Sequelize.QueryTypes.SELECT
            }
        );

        return totalItems[0].total;
    }

    async function getItems() {
        return await ATTENDANCE.findAll({
            offset,
            limit: limit,
            where: {
                userId,
                ...whereClause
            },
            order: [['date', 'DESC']],
            include: [
                {
                    model: EMPLOYEE,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ],
            attributes: [
                'employeeId',
                [Sequelize.fn('DATE', Sequelize.col('checkTime')), 'date'],
                [Sequelize.literal('TIMESTAMPDIFF(HOUR, MIN(CASE WHEN punchType = "in" THEN checkTime END), MAX(CASE WHEN punchType = "out" THEN checkTime END))'), 'totalHours'],
                [Sequelize.literal('TIME(MIN(CASE WHEN punchType = "in" THEN checkTime END))'), 'checkInTime'],
                [Sequelize.literal('TIME(MAX(CASE WHEN punchType = "out" THEN checkTime END))'), 'checkOutTime'],
                [Sequelize.literal('GREATEST(0, TIMESTAMPDIFF(HOUR, MIN(CASE WHEN punchType = "in" THEN checkTime END), MAX(CASE WHEN punchType = "out" THEN checkTime END)) - 8)'), 'overtime'],
            ],
            group: ['employeeId', 'date'],
        });
    }
}

export default getFilteredAttendanceService;

