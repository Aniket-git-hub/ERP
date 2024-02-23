import sequelize from '../../../config/database.js';
import PAYMENT_RECEIPT from '../../../models/employee/paymentReceiptModel.js';
import getMonthAndYear from '../../../utils/getMonthAndYear.js';
import { getMonthRange } from '../../../utils/getMonthRage.js';
import getAdvanceService from '../advance/getAdvanceService.js';
import updateAdvanceService from '../advance/updateAdvanceService.js';
import getAggregateAttendanceService from '../attendance/getAggregateAttendanceService.js';
import getAttendanceService from '../attendance/getAttendanceService.js';
import createDeductionService from '../deductions/createDeduction.js';
import getEmployeeByIdService from '../getEmployeeByIdService.js';

async function createPaymentReceiptService(
    userId,
    employeeId,
    attendanceMonthDate,
    date,
    remarks,
    modeOfPayment,
    deductionAmount
) {
    const transaction = await sequelize.transaction();
    try {
        const { salary } = await getEmployeeByIdService(userId, employeeId);
        const { firstDay, lastDay } = getMonthRange(attendanceMonthDate);
        const attendance = await getAttendanceService(
            userId,
            employeeId,
            firstDay,
            lastDay
        );
        const { month, year } = getMonthAndYear(attendanceMonthDate);

        const {
            totalHoursWorked,
            overtime,
            holidays: leaves
        } = await getAggregateAttendanceService(
            userId,
            employeeId,
            month,
            year
        );


        const totalSalaryAmount = totalHoursWorked * (salary / 8);
        let totalDeductionAmount = deductionAmount;
        let deductions = [];

        if (deductionAmount && deductionAmount > 0) {
            const advances = await getAdvanceService(userId, employeeId, {
                remainingAmount: 0
            });

            for (let i = 0; i < advances.length; i++) {
                const currentAdvance = advances[i];

                if (currentAdvance.remainingAmount < totalDeductionAmount) {
                    totalDeductionAmount -= currentAdvance.remainingAmount;

                    const deduction = await createDeductionService(
                        userId,
                        employeeId,
                        currentAdvance.remainingAmount,
                        date,
                        currentAdvance.id,
                        { transaction }
                    );
                    deductions.push(deduction);

                    currentAdvance.remainingAmount = 0;

                    await updateAdvanceService(
                        userId,
                        employeeId,
                        currentAdvance.id,
                        {
                            remainingAmount: 0
                        },
                        { transaction }
                    );
                } else if (
                    currentAdvance.remainingAmount > totalDeductionAmount
                ) {
                    currentAdvance.remainingAmount -= totalDeductionAmount;

                    await updateAdvanceService(
                        userId,
                        employeeId,
                        currentAdvance.id,
                        {
                            remainingAmount: currentAdvance.remainingAmount
                        },
                        { transaction }
                    );

                    const deduction = await createDeductionService(
                        userId,
                        employeeId,
                        totalDeductionAmount,
                        date,
                        currentAdvance.id,
                        { transaction }
                    );

                    deductions.push(deduction);

                    totalDeductionAmount = 0;
                    break;
                }
            }
        }

        const paymentReceipt = await PAYMENT_RECEIPT.create(
            {
                userId,
                employeeId: employeeId,
                amount:
                    deductionAmount && deductionAmount > 0
                        ? totalSalaryAmount - deductionAmount
                        : totalSalaryAmount,
                date,
                salary,
                totalHoursWorked,
                totalOvertime: overtime,
                leaves,
                remarks,
                modeOfPayment
            },
            { transaction }
        );

        await paymentReceipt.addDeductions(deductions, { transaction });
        await paymentReceipt.addAttendances(attendance, { transaction });

        await transaction.commit();

        return paymentReceipt;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}
export default createPaymentReceiptService;
