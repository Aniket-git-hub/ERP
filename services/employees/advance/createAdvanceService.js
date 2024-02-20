import ADVANCE from '../../../models/employee/advanceModel.js';
async function createAdvanceService(
    userId,
    employeeId,
    date,
    amount,
    description
) {
    try {
        const advance = await ADVANCE.create({
            userId,
            employeeId,
            date,
            amount,
            description,
            remainingAmount: amount
        });

        return advance;
    } catch (error) {
        throw error;
    }
}

export default createAdvanceService;
