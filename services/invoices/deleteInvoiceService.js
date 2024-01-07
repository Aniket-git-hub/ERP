import INVOICE from "../../models/invoiceModel.js";
import CustomError from "../../utils/createError.js";

async function deleteInvoiceService(invoiceId) {
    try {
        const deletedRowsCount = await INVOICE.destroy({
            where: { id: invoiceId },
        });

        if (deletedRowsCount === 0) {
            throw new CustomError('InvoiceError', 'Invoice not found');
        }
        return deletedRowsCount
    } catch (error) {
        throw error;
    }
}

export default deleteInvoiceService;
