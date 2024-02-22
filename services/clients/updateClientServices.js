import CLIENT from '../../models/work/clientModel.js';
import CustomError from '../../utils/createError.js';
import getClientByIdService from './getClientByIdService.js';

async function updateClientService(userId, clientId, clientData) {
    try {
        const updatedClient = await CLIENT.update(clientData, {
            where: { id: clientId, userId },
            returning: true,
            plain: true
        });
        if (!updatedClient) {
            throw new CustomError('ClientError', 'Client not found');
        }
        const updated = await getClientByIdService(userId, clientId)
        return updated
    } catch (error) {
        throw error;
    }
}

export default updateClientService;
