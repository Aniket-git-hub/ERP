import createInvoiceService from "../../services/invoices/createInvoiceService.js";

async function createInvoiceController(req, res, next) {
    const { jobIds, clientId, cGst, iGst, sGst, invoiceNumber, invoiceDate } = req.body;
    try {
        const invoice = await createInvoiceService(jobIds, clientId, cGst, iGst, sGst, invoiceNumber, invoiceDate);
        res.status(201).json({
            invoice,
            message: 'Invoice created successfully',
        })
    } catch (error) {
        next(error)
    }
}

export default createInvoiceController;