import getClientByIdService from "../../services/clients/getClientByIdService.js";

async function getClientController(req, res, next) {
    const { clientId } = req.params;
    try {
        const clients = await getClientByIdService(clientId);
        res.json({
            clients,
        });
    } catch (error) {
        next(error);
    }
}

export default getClientController;