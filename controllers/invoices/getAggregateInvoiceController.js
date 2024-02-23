import getAggregateInvoiceService from "../../services/invoices/getAggregateInvoiceService.js";

async function getAggregateInvoiceController(req, res, next) {
    const { userId } = req.user
    const { type, month, year } = req.query

    try {
        const aggregate = await getAggregateInvoiceService(userId, type, parseInt(year), parseInt(month));
        res.json(aggregate)
    } catch (error) {
        next(error)
    }
}

export default getAggregateInvoiceController;