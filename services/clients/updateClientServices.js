import CLIENT from '../../models/work/clientModel.js';
import CustomError from '../../utils/createError.js';
async function updateClientService(userId, clientId, clientData) {
    try {
        const updatedClient = await CLIENT.update(clientData, {
            where: { id: clientId, UserId: userId },
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