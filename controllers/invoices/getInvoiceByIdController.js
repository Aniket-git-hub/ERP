import getInvoiceByIdService from "../../services/invoices/getInvoiceByIdService.js";

async function getInvoiceByIdController(req, res, next) {
    try {
        const { invoiceId } = req.params;

        const invoice = await getInvoiceByIdService(invoiceId);

        res.json({
            success: true,
            invoice,
        });

    } catch (error) {
        next(error)
    }
}

export default getInvoiceByIdController;