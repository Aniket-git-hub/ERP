import ADVANCE from '../../../models/employee/advanceModel.js';

async function updateAdvanceService(
    userId,
    employeeId,
    advanceId,
    advanceData,
    transaction
) {
    try {
        const updatedCount = await ADVANCE.update(advanceData, {
            where: {
                UserId: userId,
                employeeId,
                id: advanceId
            },
            transaction
        });

        return updatedCount;
    } catch (error) {
        throw error;
    }
}

export default updateAdvanceService;
