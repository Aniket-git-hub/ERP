import JOB from '../../models/jobModel.js';

async function getJobByIdsService(jobs) {
    try {
        const job = await JOB.findAll({
            where: {
                id: jobs
            }
        })
        return job
    } catch (err) {
        throw err
    }
}

export default getJobByIdsService;