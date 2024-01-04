import CLIENT from '../../models/clientModel.js';
import JOB from '../../models/jobModel.js';
import MATERIAL from '../../models/materialModel.js';

async function getJobByIdService(jobId) {
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
            ]
        })
        return job.dataValues
    } catch (err) {
        throw err
    }
}

export default getJobByIdService;