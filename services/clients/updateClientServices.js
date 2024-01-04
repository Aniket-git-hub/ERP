import CLIENT from '../../models/clientModel.js';
import CustomError from '../../utils/createError.js';
async function updateClientService(clientId, clientData) {
    try {
        const updatedClient = await CLIENT.update(clientData, {
            where: { id: clientId },
            returning: true,
            plain: true,
        });
        if (!updatedClient) {
            throw new CustomError('ClientError', 'Client not found');
        }
        return updatedClient[1];
    } catch (error) {
        throw error;
    }
}

export default updateClientService;