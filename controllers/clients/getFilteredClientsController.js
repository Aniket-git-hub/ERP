import getFilteredClientsService from '../../services/clients/getFilteredClientsService.js';

async function getFilteredClientsController(req, res, next) {
    const { page = 1, limit = 50 } = req.query;
    const { userId } = req.user
    try {
        const clients = await getFilteredClientsService(
            userId,
            parseInt(page),
            parseInt(limit),
        );
        res.json(clients);
    } catch (error) {
        next(error);
    }
}

export default getFilteredClientsController;
