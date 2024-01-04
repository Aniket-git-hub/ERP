import getFilteredClientsService from "../../services/clients/getFilteredClientsService.js";

async function getFilteredClientsController(req, res, next) {
    const { page = 1, limit = 10 } = req.query;
    const filters = req.query;
    try {
        const clients = await getFilteredClientsService(parseInt(page), parseInt(limit), filters);
        res.json(clients);
    } catch (error) {
        next(error)
    }
}

export default getFilteredClientsController;