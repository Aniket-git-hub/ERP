import updateClientService from "../../services/clients/updateClientServices.js";
async function updateClientController(req, res, next) {
    const { clientId } = req.params;
    const clientData = req.body;
    const { userId } = req.user
    try {
        await updateClientService(userId, clientId, clientData);
        res.json({
            message: "client updated"
        });
    } catch (error) {
        next(error);
    }
}

export default updateClientController;