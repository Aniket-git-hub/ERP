import deleteInvoiceService from "../../services/invoices/deleteInvoiceService.js";

async function deleteInvoiceController(req, res, next) {
    try {
        const { invoiceId } = req.params;

        await deleteInvoiceService(invoiceId);

        res.json({
            success: true,
            message: 'Invoice deleted successfully'
        });

    } catch (error) {
        next(error)
    }
}

export default deleteInvoiceController;