import CLIENT from '../../models/clientModel.js';
import JOB from '../../models/jobModel.js';
import MATERIAL from '../../models/materialModel.js';

async function getJobByIdService(userId, jobId) {
    try {
        const job = await JOB.findByPk(jobId, {
            include: [
                {
                    model: CLIENT,
                    attributes: ['id', 'name', 'email', 'phone', 'gst', 'address'],
                },
                {
                    model: MATERIAL,
                    attributes: ['id', 'name', 'hardness', 'density'],
                },
            ],
            where: {
                UserId: userId
            }
        })
        return job
    } catch (err) {
        throw err
    }
}

export default getJobByIdService;