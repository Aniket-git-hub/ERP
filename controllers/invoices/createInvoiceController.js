import createInvoiceService from "../../services/invoices/createInvoiceService.js";

async function createInvoiceController(req, res, next) {
    const {
        jobIds,
        clientId,
        invoiceType,
        invoiceDate,
        cGst,
        iGst,
        sGst,
        notes,
        totalQuantity,
        totalAmount } = req.body;
    const { userId } = req.user
    try {
        const invoice = await createInvoiceService(
            jobIds,
            userId,
            clientId,
            invoiceType,
            invoiceDate,
            cGst,
            iGst,
            sGst,
            notes,
            totalQuantity,
            totalAmount
        );
        res.status(201).json({
            invoice,
            message: 'Invoice created successfully',
        })
    } catch (error) {
        next(error)
    }
}

export default createInvoiceController;