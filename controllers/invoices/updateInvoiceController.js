import updateInvoiceService from '../../services/invoices/updateInvoiceService.js';

async function updateInvoiceController(req, res, next) {
    const { invoiceId } = req.params;
    const updatedFields = req.body;
    const { userId } = req.user;
    try {
        const invoice = await updateInvoiceService(userId, invoiceId, updatedFields);
        res.json({
            invoice,
            message: ' Invoice updated successfully',
        });
    } catch (error) {
        next(error);
    }
}

export default updateInvoiceController;
