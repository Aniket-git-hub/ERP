import JOB from '../../models/work/jobModel.js';

async function getJobByIdsService(userId, jobs) {
    try {
        const job = await JOB.findAll({
            where: {
                id: jobs,
                userId
            }
        });
        return job;
    } catch (err) {
        throw err;
    }
}

export default getJobByIdsService;
