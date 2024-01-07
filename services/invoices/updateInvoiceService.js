import INVOICE from '../../models/invoiceModel.js';
import CustomError from "../../utils/createError.js";

async function updateInvoiceService(invoiceId, updatedFields) {
    try {
        const updatedInvoice = await INVOICE.update(updatedFields, {
            where: { id: invoiceId },
            returning: true,
            plain: true,
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