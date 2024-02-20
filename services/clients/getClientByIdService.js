import CLIENT from '../../models/work/clientModel.js';

async function getClientByIdService(userId, clientId) {
    try {
        const clients = await CLIENT.findByPk(clientId, {
            where: {
                userId,
            }
        });
        return clients;
    } catch (error) {
        throw error;
    }
}

export default getClientByIdService;
