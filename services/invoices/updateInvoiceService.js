import INVOICE from '../../models/work/invoiceModel.js';
import CustomError from '../../utils/createError.js';

async function updateInvoiceService(userId, invoiceId, updatedFields) {
    try {
        const updatedInvoice = await INVOICE.update(updatedFields, {
            where: { id: invoiceId, userId }
        });

        if (!updatedInvoice) {
            throw new CustomError('InvoiceError', 'Invoice not found');
        }
        const update = await INVOICE.findByPk(invoiceId, {
            where: { userId }
        })
        return update;
    } catch (error) {
        throw error;
    }
}

export default updateInvoiceService;
