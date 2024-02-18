import createPaymentReceiptService from "../../../services/employees/paymentReceipts/createPaymentReceiptService.js"

async function createPaymentReceiptController(req, res, next) {
    const { userId } = req.user
    const { employeeId } = req.params
    const { attendanceMonthDate, date, remarks, modeOfPayment, deductionAmount } = req.body
    try {
        const paymentReceipt = await createPaymentReceiptService(
            userId,
            employeeId,
            attendanceMonthDate,
            date,
            remarks,
            modeOfPayment,
            deductionAmount
        )
        res.json({
            paymentReceipt,
            message: "Payment receipt created successfully"
        })
    } catch (error) {
        next(error)
    }
}

export default createPaymentReceiptController