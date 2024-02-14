import getInvoiceByIdService from "../../services/invoices/getInvoiceByIdService.js";

async function getInvoiceByIdController(req, res, next) {
    const { invoiceId } = req.params;
    const { userId } = req.user
    try {
        const invoice = await getInvoiceByIdService(userId, invoiceId);
        res.json({
            success: true,
            invoice,
        });

    } catch (error) {
        next(error)
    }
}

export default getInvoiceByIdController;