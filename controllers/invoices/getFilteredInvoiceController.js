import getFilteredInvoicesService from '../../services/invoices/getFilteredInvoiceService.js';

async function getFilteredInvoiceController(req, res, next) {
    const { page, limit, filters } = req.query;
    const { userId } = req.user
    try {
        const result = await getFilteredInvoicesService(userId, page, limit, filters);
        res.send(result)
    } catch (error) {
        next(error)
    }
}

export default getFilteredInvoiceController;
