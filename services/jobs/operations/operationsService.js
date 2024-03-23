import OPERATIONS from "../../../models/work/operationModel.js";
import CustomError from "../../../utils/createError.js";

export async function addOperationService(userId, operationData) {
    try {
        const operation = await OPERATIONS.create({
            userId,
            ...operationData
        });
        return operation;
    } catch (error) {
        throw error;
    }
}

export async function updateOperationService(
    userId,
    operationId,
    operationData
) {
    try {
        const [updatedRows] = await OPERATIONS.update(operationData, {
            where: {
                id: operationId,
                userId
            }
        });

        if (updatedRows === 0) {
            throw new CustomError(
                'operationError',
                `Scrap sell with id ${operationId} not found.`
            );
        }

        const updatedOperation = await OPERATIONS.findByPk(operationId);
        return updatedOperation;
    } catch (error) {
        throw error;
    }
}

export async function deleteOperationService(userId, operationId) {
    try {
        const deletedRows = await OPERATIONS.destroy({
            where: {
                id: operationId,
                userId
            }
        });

        if (deletedRows === 0) {
            throw new CustomError(
                'operationError',
                `Operation with id ${operationId} not found.`
            );
        }

        return { message: 'Operation deleted successfully.' };
    } catch (error) {
        throw error;
    }
}

export async function getAllOperationsService(userId) {
    try {
        const operations = await OPERATIONS.findAll({
            where: { userId }
        });
        return operations;
    } catch (error) {
        throw error;
    }
}

export async function getOperationByIdService(userId, operationId) {
    try {
        const operation = await OPERATIONS.findByPk(operationId, {
            where: { userId }
        });

        if (!operation) {
            throw new CustomError(
                'operationError',
                `Operation with id ${operationId} not found.`
            );
        }

        return operation;
    } catch (error) {
        throw error;
    }
}
