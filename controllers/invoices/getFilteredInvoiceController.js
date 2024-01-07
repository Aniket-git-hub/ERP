import getFilteredInvoicesService from '../../services/invoices/getFilteredInvoiceService.js';

async function getFilteredInvoiceController(req, res, next) {
    try {
        const { page, limit, filters } = req.query;

        const result = await getFilteredInvoicesService(page, limit, filters);

        res.send(result)
    } catch (error) {
        next(error)
    }
}

export default getFilteredInvoiceController;
