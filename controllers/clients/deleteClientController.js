import deleteClientsService from "../../services/clients/deleteClientServices.js";
async function deleteClientController(req, res, next) {
    try {
        const { clientId } = req.params;
        await deleteClientsService(clientId);
        res.json({
            message: 'Client deleted successfully'
        });
    } catch (error) {
        next(error)
    }
}

export default deleteClientController;