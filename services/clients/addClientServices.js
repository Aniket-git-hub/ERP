import CLIENT from '../../models/clientModel.js';
async function addClientService(name, email, phone, gst, address) {
    try {
        const client = await CLIENT.create({ name, email, phone, gst, address })
        return client
    } catch (err) {
        throw err
    }
}

export default addClientService;