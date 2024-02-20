import INVOICE from '../../models/work/invoiceModel.js';
import CustomError from '../../utils/createError.js';

async function deleteInvoiceService(userId, invoiceId) {
    try {
        const deletedRowsCount = await INVOICE.destroy({
            where: { id: invoiceId, UserId: userId }
        });

        if (deletedRowsCount === 0) {
            throw new CustomError('InvoiceError', 'Invoice not found');
        }
        return deletedRowsCount;
    } catch (error) {
        throw error;
    }
}

export default deleteInvoiceService;
