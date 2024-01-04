import CLIENT from '../../models/clientModel.js';
import CustomError from "../../utils/createError.js";
async function deleteClientsService(clientId) {
    try {
        const deletedClient = await CLIENT.destroy({
            where: { id: clientId },
        });
        if (!deletedClient) {
            throw new CustomError("ClientError", "Client not found")
        }
        return deletedClient;
    } catch (error) {
        throw error;
    }
}

export default deleteClientsService;