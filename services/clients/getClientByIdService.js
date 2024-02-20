import CLIENT from '../../models/work/clientModel.js';

async function getClientByIdService(clientId) {
    try {
        const clients = await CLIENT.findByPk(clientId);
        return clients;
    } catch (error) {
        throw error;
    }
}

export default getClientByIdService;
