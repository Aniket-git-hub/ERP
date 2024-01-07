import updateInvoiceService from "../../services/invoices/updateInvoiceService.js";

async function updateInvoiceController(req, res, next) {
    try {
        const { invoiceId } = req.params;
        const updatedFields = req.body;
        await updateInvoiceService(invoiceId, updatedFields);
        res.json({
            message: ' Invoice updated successfully',
            success: true,
        });
    } catch (error) {
        next(error)
    }
}

export default updateInvoiceController;