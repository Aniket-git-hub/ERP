import CLIENT from '../../models/work/clientModel.js';
import CustomError from '../../utils/createError.js';
async function deleteClientsService(userId, clientId) {
    try {
        const deletedClient = await CLIENT.destroy({
            where: { id: clientId, UserId: userId }
        });
        if (!deletedClient) {
            throw new CustomError('ClientError', 'Client not found');
        }
        return deletedClient;
    } catch (error) {
        throw error;
    }
}

export default deleteClientsService;
