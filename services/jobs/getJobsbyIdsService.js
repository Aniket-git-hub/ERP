import JOB from '../../models/jobModel.js';

async function getJobByIdsService(userId, jobs) {
    try {
        const job = await JOB.findAll({
            where: {
                id: jobs,
                UserId: userId
            }
        })
        return job
    } catch (err) {
        throw err
    }
}

export default getJobByIdsService;