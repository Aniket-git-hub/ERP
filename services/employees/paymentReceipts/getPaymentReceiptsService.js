import DEDUCTION from "../../../models/employee/deductionModel.js"
import PAYMENT_RECEIPT from "../../../models/employee/paymentReceiptModel.js"
import buildWhereClause from "../../../utils/buildWhereClause.js"

async function getPaymentReceiptsService(userId, employeeId, filters, config) {
    try {
        const whereClause = buildWhereClause(filters, [
            'date',
            'fromDate',
            'toDate'
        ])
        const paymentReceipts = await PAYMENT_RECEIPT.findAll({
            where: {
                UserId: userId,
                employeeId,
                ...whereClause,
            },
            include: [
                {
                    model: DEDUCTION,
                    as: 'deductions',
                }
            ]
        })
        return paymentReceipts
    } catch (error) {
        throw error
    }
}

export default getPaymentReceiptsService