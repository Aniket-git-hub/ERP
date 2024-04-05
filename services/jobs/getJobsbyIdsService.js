import { Sequelize } from 'sequelize';
import JOB from '../../models/work/jobModel.js';
import OPERATION_COST from '../../models/work/operationCostModel.js';
import OPERATIONS from '../../models/work/operationModel.js';

async function getJobByIdsService(userId, jobs) {
    try {
        const job = await JOB.findAll({
            where: {
                id: jobs,
                userId
            },
            include: [
                {
                    model: OPERATION_COST,
                    attributes: ['id', 'cost'],
                    include: [
                        {
                            model: OPERATIONS,
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ],
            attributes: {
                include: [
                    ['quantity', 'qty'],
                    [
                        Sequelize.literal(
                            '`Job`.`quantity` * (SELECT SUM(`cost`) FROM `operation_costs` WHERE `operation_costs`.`jobId` = `Job`.`id`)'
                        ),
                        'total'
                    ]
                ]
            }
        });
        return job;
    } catch (err) {
        throw err;
    }
}

export default getJobByIdsService;
