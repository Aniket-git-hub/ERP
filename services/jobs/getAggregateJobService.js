import { Op, Sequelize } from 'sequelize';
import CLIENT from "../../models/work/clientModel.js";
import JOB from "../../models/work/jobModel.js";
import MATERIAL from "../../models/work/materialModel.js";

async function getAggregateJobService(userId, type, year, month) {
    try {
        let whereCondition = {
            userId: userId
        };

        if (type === 'monthly') {
            whereCondition.createdAt = {
                [Op.gte]: new Date(year, month - 1, 1),
                [Op.lt]: new Date(year, month, 1)
            };
        } else if (type === 'yearly') {
            whereCondition.createdAt = {
                [Op.gte]: new Date(year, 0, 1),
                [Op.lt]: new Date(year + 1, 0, 1)
            };
        }

        const totalJobs = await JOB.count({
            where: whereCondition
        });

        const jobsPerClient = await JOB.findAll({
            where: whereCondition,
            include: CLIENT,
            group: ['client.id'],
            attributes: ['client.id', [Sequelize.fn('COUNT', 'client.id'), 'jobCount']]
        });

        const jobsPerMaterial = await JOB.findAll({
            where: whereCondition,
            include: MATERIAL,
            group: ['material.id'],
            attributes: ['material.id', [Sequelize.fn('COUNT', 'material.id'), 'jobCount']]
        });

        const maxJobs = await JOB.count({
            where: whereCondition,
            group: [Sequelize.fn('MONTH', Sequelize.col('createdAt'))],
            order: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'DESC']],
            limit: 1
        });

        const minJobs = await JOB.count({
            where: whereCondition,
            group: [Sequelize.fn('MONTH', Sequelize.col('createdAt'))],
            order: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'ASC']],
            limit: 1
        });

        const rateStats = await JOB.findAll({
            where: whereCondition,
            attributes: [
                [Sequelize.fn('max', Sequelize.literal('COALESCE((quantity * COALESCE(millingRate, 0) + quantity * COALESCE(drillingRate, 0)), 0)')), 'maxRate'],
                [Sequelize.fn('min', Sequelize.literal('COALESCE((quantity * COALESCE(millingRate, 0) + quantity * COALESCE(drillingRate, 0)), 0)')), 'minRate'],
                [Sequelize.fn('avg', Sequelize.literal('COALESCE((quantity * COALESCE(millingRate, 0) + quantity * COALESCE(drillingRate, 0)), 0)')), 'avgRate']
            ]
        });

        return {
            totalJobs,
            jobsPerClient,
            jobsPerMaterial,
            maxJobs,
            minJobs,
            rateStats
        };

    } catch (error) {
        throw error;
    }
}

export default getAggregateJobService;
