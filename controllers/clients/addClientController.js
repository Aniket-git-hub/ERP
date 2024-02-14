import addClientService from "../../services/clients/addClientServices.js";
async function addClientController(req, res, next) {
    const { userId } = req.user
    const { name, email, phone, gst, address } = req.body;
    try {
        const client = await addClientService(userId, name, email, phone, gst, address)
        res.status(201).json({
            client,
            message: "New client added successfully"
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export default addClientController;