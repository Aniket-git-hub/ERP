import getPaymentReceiptsService from '../../../services/employees/paymentReceipts/getPaymentReceiptsService.js';
import { getMonthRange } from '../../../utils/getMonthRage.js';

async function getPaymentReceiptByMonthController(req, res, next) {
    const { userId } = req.user;
    const { employeeId } = req.params;
    const { date } = req.query;
    try {
        const { firstDay, lastDay } = getMonthRange(date);
        console.log(firstDay, lastDay);
        const paymentReceipts = await getPaymentReceiptsService(
            userId,
            employeeId,
            {
                fromDate: firstDay,
                toDate: lastDay
            }
        );
        res.json({ paymentReceipts });
    } catch (error) {
        next(error);
    }
}

export default getPaymentReceiptByMonthController;
