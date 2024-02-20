import DEDUCTION from '../../../models/employee/deductionModel.js';

async function createDeductionService(
    userId,
    employeeId,
    amount,
    date,
    advanceId,
    transaction
) {
    try {
        const deduction = await DEDUCTION.create(
            {
                userId,
                employeeId,
                amountDeducted: amount,
                date,
                advanceId
            },
            {
                transaction
            }
        );
        return deduction;
    } catch (error) {
        throw error;
    }
}

export default createDeductionService;
