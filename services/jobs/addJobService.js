import sequelize from '../../config/database.js';
import JOB from '../../models/work/jobModel.js';
import OPERATION_COST from '../../models/work/operationCostModel.js';
async function addJobService(
    userId,
    drawingNumber,
    description,
    quantity,
    date,
    size,
    clientId,
    materialId,
    imageUrl,
    operations,
    operationCosts
) {

    const transaction = await sequelize.transaction()

    try {

        const job = await JOB.create({
            userId,
            drawingNumber,
            description,
            quantity,
            date,
            size,
            imageUrl,
            clientId,
            materialId,
        }, { transaction }
        );

        await job.addOperations(operations, { transaction });

        const costs = operationCosts.map(cost => ({
            cost: cost.operationCost,
            userId: userId,
            operationId: cost.operationId,
            jobId: job.id
        }));

        await OPERATION_COST.bulkCreate(costs, { transaction });

        await transaction.commit();
        return job;
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
}

export default addJobService;
