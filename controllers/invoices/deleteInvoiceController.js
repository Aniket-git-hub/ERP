import deleteInvoiceService from '../../services/invoices/deleteInvoiceService.js';

async function deleteInvoiceController(req, res, next) {
    const { invoiceId } = req.params;
    const { userId } = req.user;
    try {
        await deleteInvoiceService(userId, invoiceId);

        res.json({
            success: true,
            message: 'Invoice deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

export default deleteInvoiceController;
