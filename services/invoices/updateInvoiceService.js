import INVOICE from '../../models/work/invoiceModel.js';
import CustomError from '../../utils/createError.js';

async function updateInvoiceService(userId, invoiceId, updatedFields) {
    try {
        const updatedInvoice = await INVOICE.update(updatedFields, {
            where: { id: invoiceId, userId },
            returning: true,
            plain: true
        });

        if (!updatedInvoice) {
            throw new CustomError('InvoiceError', 'Invoice not found');
        }

        return updatedInvoice[1];
    } catch (error) {
        throw error;
    }
}

export default updateInvoiceService;
