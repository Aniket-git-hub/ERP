import PAYMENT_RECEIPT from "../../../models/employee/paymentReceiptModel.js"
import { getMonthRange } from "../../../utils/getMonthRage.js"
import getAdvanceService from "../advance/getAdvanceService.js"
import updateAdvanceService from "../advance/updateAdvanceService.js"
import getAggregateAttendanceService from "../attendance/getAggregateAttendanceService.js"
import createDeductionService from "../deductions/createDeduction.js"
import getEmployeeByIdService from "../getEmployeeByIdService.js"

async function createPaymentReceiptService(userId, employeeId, attendanceMonthDate, date, remarks, modeOfPayment, deductionAmount) {
    try {
        const { salary } = await getEmployeeByIdService(userId, employeeId)
        const { firstDay, lastDay } = getMonthRange(attendanceMonthDate)
        const { totalHoursWorked, overtime, leaves } = await getAggregateAttendanceService(userId, employeeId, firstDay, lastDay)
        const totalSalaryAmount = totalHoursWorked * (salary / 8)
        let totalDeductionAmount = deductionAmount
        let deductions = []
        if (deductionAmount && deductionAmount > 0) {
            const advances = await getAdvanceService(userId, employeeId, {
                remainingAmount: { [Sequelize.Op.ne]: 0 }
            });

            for (let i = 0; i < advances.length; i++) {
                if (advances[i].remainingAmount < totalDeductionAmount) {
                    totalDeductionAmount -= advances[i].remainingAmount;

                    // Update ADVANCE record with remaining amount 0
                    await updateAdvanceService(userId, employeeId, advances[i].id, {
                        remainingAmount: 0
                    })

                    const { id } = await createDeductionService(userId, employeeId, advances[i].remainingAmount, totalDeductionAmount, date, advances[i].date, advances[i].id)
                    deductions.push(id)
                    // Create DEDUCTION record
                    // await DEDUCTION.create({
                    //     UserId: userId,
                    //     advanceId: advances[i].id,
                    //     amountDeducted: advances[i].remainingAmount
                    // });

                } else {
                    // Update ADVANCE record with reduced remaining amount
                    await updateAdvanceService(userId, employeeId, advances[i].id, {
                        remainingAmount: advances[i].remainingAmount - totalDeductionAmount
                    })

                    // Create DEDUCTION record
                    // await DEDUCTION.create({
                    //     UserId: userId,
                    //     advanceId: advances[i].id,
                    //     amountDeducted: totalDeductionAmount
                    // });
                    const { id } = await createDeductionService(userId, employeeId, totalDeductionAmount, date, advances[i].id)
                    deductions.push(id)
                    totalDeductionAmount = 0;
                    break;
                }
            }
        }


        // return advances
        const paymentReceipt = await PAYMENT_RECEIPT.create({
            UserId: userId,
            employeeId: employeeId,
            amount: totalSalaryAmount,
            date,
            salary,
            totalHoursWorked,
            totalOvertime: overtime,
            leaves,
            remarks,
            modeOfPayment
        })
        await paymentReceipt.addDeduction(deductions)

        return paymentReceipt
    } catch (error) {
        throw error
    }
}

export default createPaymentReceiptService