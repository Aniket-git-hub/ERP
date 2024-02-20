import CLIENT from '../../models/work/clientModel.js';
async function addClientService(userId, name, email, phone, gst, address) {
    try {
        const client = await CLIENT.create({
            UserId: userId,
            name,
            email,
            phone,
            gst,
            address
        });
        return client;
    } catch (err) {
        throw err;
    }
}

export default addClientService;
