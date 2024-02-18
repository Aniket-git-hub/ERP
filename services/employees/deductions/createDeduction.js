import DEDUCTION from "../../../models/employee/deductionModel.js";

async function createDeductionService(userId, employeeId, amount, date, advanceId) {
    try {
        const deduction = await DEDUCTION.create({
            UserId: userId,
            employeeId,
            amountDeducted: amount,
            date,
            advanceId
        })
        return deduction
    } catch (error) {
        throw error
    }
}

export default createDeductionService;