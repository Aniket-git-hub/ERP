import updateInvoiceService from '../../services/invoices/updateInvoiceService.js';

async function updateInvoiceController(req, res, next) {
    const { invoiceId } = req.params;
    const updatedFields = req.body;
    const { userId } = req.user;
    try {
        await updateInvoiceService(userId, invoiceId, updatedFields);
        res.json({
            message: ' Invoice updated successfully',
            success: true
        });
    } catch (error) {
        next(error);
    }
}

export default updateInvoiceController;
