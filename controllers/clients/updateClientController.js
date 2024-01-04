import updateClientService from "../../services/clients/updateClientServices.js";
async function updateClientController(req, res, next) {
    const { clientId } = req.params;
    const clientData = req.body;
    try {
        await updateClientService(clientId, clientData);
        res.json({
            message: "client updated"
        });
    } catch (error) {
        next(error);
    }
}

export default updateClientController;