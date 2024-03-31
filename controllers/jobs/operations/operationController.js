import { addOperationService, deleteOperationService, getAllOperationsService, getOperationByIdService, updateOperationService } from "../../../services/jobs/operations/operationsService.js";

export async function addOperationController(req, res, next) {
    const operationData = req.body;
    const { userId } = req.user;
    try {
        const operation = await addOperationService(userId, operationData);
        res.status(201).json({ operation, message: "Operation added successfully" });
    } catch (error) {
        next(error);
    }
}

export async function updateOperationController(req, res, next) {
    const { operationId } = req.params;
    const operationData = req.body;
    const { userId } = req.user;

    try {
        const updatedOperation = await updateOperationService(
            userId,
            operationId,
            operationData
        );
        res.json({ updatedOperation, message: "Operation updated successfully" });
    } catch (error) {
        next(error);
    }
}

export async function deleteOperationController(req, res, next) {
    const { operationId } = req.params;
    const { userId } = req.user;
    try {
        const result = await deleteOperationService(userId, operationId);
        res.json({ message: "operation deleted" });
    } catch (error) {
        next(error);
    }
}

export async function getAllOperationsController(req, res, next) {
    const { userId } = req.user;
    try {
        const operations = await getAllOperationsService(userId);
        res.json({ operations });
    } catch (error) {
        next(error);
    }
}

export async function getOperationByIdController(req, res, next) {
    const { operationId } = req.params;
    const { userId } = req.user;
    try {
        const operation = await getOperationByIdService(userId, operationId);
        res.json({ operation });
    } catch (error) {
        next(error);
    }
}
