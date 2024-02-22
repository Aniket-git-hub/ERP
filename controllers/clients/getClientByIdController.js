import getClientByIdService from '../../services/clients/getClientByIdService.js';

async function getClientController(req, res, next) {
    const { clientId } = req.params;
    const { userId } = req.user
    try {
        const client = await getClientByIdService(userId, clientId);
        if (!client) {
            return res.status(404).json({ message: 'No Client found' });
        }

        res.json({
            client,
        });
    } catch (error) {
        next(error);
    }
}

export default getClientController;
