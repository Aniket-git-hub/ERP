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

        const [totalJobs, totalQuantity, jobsPerClient, jobsPerMaterial, maxJobs, minJobs, rateStats] = await Promise.all([
            JOB.count({ where: whereCondition }),
            JOB.sum('quantity', { where: whereCondition }),
            JOB.findAll({
                where: whereCondition,
                include: CLIENT,
                group: ['client.id'],
                attributes: ['client.id', [Sequelize.fn('COUNT', 'client.id'), 'jobCount']]
            }),
            JOB.findAll({
                where: whereCondition,
                include: MATERIAL,
                group: ['material.id'],
                attributes: ['material.id', [Sequelize.fn('COUNT', 'material.id'), 'jobCount']]
            }),
            JOB.count({
                where: whereCondition,
                group: [Sequelize.fn('MONTH', Sequelize.col('createdAt'))],
                order: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'DESC']],
                limit: 1
            }),
            JOB.count({
                where: whereCondition,
                group: [Sequelize.fn('MONTH', Sequelize.col('createdAt'))],
                order: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'ASC']],
                limit: 1
            }),
            getRateStats(userId, type, year, month)
        ]);

        return {
            totalJobs,
            totalQuantity,
            jobsPerClient,
            jobsPerMaterial,
            maxJobs,
            minJobs,
            rateStats: rateStats ? rateStats : { min: 0, max: 0, min: 0 }
        };

    } catch (error) {
        throw error;
    }
}

export default getAggregateJobService;


async function getRateStats(userId, type, year, month) {
    try {
        // Fetch jobs with associated operation costs and calculate total price in the database
        const jobs = await JOB.findAll({
            where: {
                userId: userId,
                createdAt: {
                    [Op.gte]: new Date(year, month - 1, 1),
                    [Op.lt]: new Date(year, month, 1)
                }
            },
            attributes: [
                'id',
                ['quantity', 'qty'],
                [Sequelize.literal('`Job`.`quantity` * (SELECT SUM(`cost`) FROM `operation_costs` WHERE `operation_costs`.`jobId` = `Job`.`id`)'), 'totalPrice']
            ]
        });


        // Extract total prices from jobs
        const totalPrices = jobs?.map(job => parseFloat(job.getDataValue('totalPrice')));

        // Calculate rate statistics
        const max = Math.max(...totalPrices);
        const min = Math.min(...totalPrices);
        const avg = totalPrices.reduce((acc, price) => acc + price, 0) / totalPrices.length;

        return {
            max,
            min,
            avg
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}
