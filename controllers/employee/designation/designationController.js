import { addDesignationService, deleteDesignationService, getAllDesignationsByDepartmentService, getAllDesignationsService, getDesignationByIdService, updateDesignationService } from "../../../services/employees/designation/designationService.js";

export async function addDesignationController(req, res, next) {
    const designationData = req.body;
    const { userId } = req.user;
    try {
        const designation = await addDesignationService(userId, designationData);
        res.status(201).json({ designation, message: "Designation added successfully" });
    } catch (error) {
        next(error);
    }
}

export async function updateDesignationController(req, res, next) {
    const { designationId } = req.params;
    const designationData = req.body;
    const { userId } = req.user;

    try {
        const updatedDesignation = await updateDesignationService(
            userId,
            designationId,
            designationData
        );
        res.json({ updatedDesignation, message: "Designation updated successfully" });
    } catch (error) {
        next(error);
    }
}

export async function deleteDesignationController(req, res, next) {
    const { designationId } = req.params;
    const { userId } = req.user;
    try {
        const result = await deleteDesignationService(userId, designationId);
        res.json({ message: "Designation deleted" });
    } catch (error) {
        next(error);
    }
}

export async function getAllDesignationsController(req, res, next) {
    const { userId } = req.user;
    const { grouped } = req.query;
    try {
        if (grouped) {
            const designations = await getAllDesignationsByDepartmentService(userId)
            res.json({ designations });
        } else {
            const designations = await getAllDesignationsService(userId);
            res.json({ designations });
        }
    } catch (error) {
        next(error);
    }
}

export async function getDesignationByIdController(req, res, next) {
    const { designationId } = req.params;
    const { userId } = req.user;
    try {
        const designation = await getDesignationByIdService(userId, designationId);
        res.json({ designation });
    } catch (error) {
        next(error);
    }
}
