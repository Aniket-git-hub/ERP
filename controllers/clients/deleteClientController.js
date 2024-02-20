import deleteClientsService from '../../services/clients/deleteClientServices.js';
async function deleteClientController(req, res, next) {
    const { clientId } = req.params;
    const { userId } = req.user;
    try {
        await deleteClientsService(userId, clientId);
        res.json({
            message: 'Client deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

export default deleteClientController;
