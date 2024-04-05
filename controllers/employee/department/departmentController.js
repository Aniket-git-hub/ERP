import { addDepartmentService, deleteDepartmentService, getAllDepartmentsService, getDepartmentByIdService, updateDepartmentService } from "../../../services/employees/department/departmentService.js";

export async function addDepartmentController(req, res, next) {
    const departmentData = req.body;
    const { userId } = req.user;
    try {
        const Department = await addDepartmentService(userId, departmentData);
        res.status(201).json({ Department, message: "Department added successfully" });
    } catch (error) {
        next(error);
    }
}

export async function updateDepartmentController(req, res, next) {
    const { departmentId } = req.params;
    const departmentData = req.body;
    const { userId } = req.user;

    try {
        const updatedDepartment = await updateDepartmentService(
            userId,
            departmentId,
            departmentData
        );
        res.json({ updatedDepartment, message: "Department updated successfully" });
    } catch (error) {
        next(error);
    }
}

export async function deleteDepartmentController(req, res, next) {
    const { departmentId } = req.params;
    const { userId } = req.user;
    try {
        const result = await deleteDepartmentService(userId, departmentId);
        res.json({ message: "Department deleted" });
    } catch (error) {
        next(error);
    }
}

export async function getAllDepartmentsController(req, res, next) {
    const { userId } = req.user;
    try {
        const departments = await getAllDepartmentsService(userId);
        res.json({ departments });
    } catch (error) {
        next(error);
    }
}

export async function getDepartmentByIdController(req, res, next) {
    const { departmentId } = req.params;
    const { userId } = req.user;
    try {
        const department = await getDepartmentByIdService(userId, departmentId);
        res.json({ department });
    } catch (error) {
        next(error);
    }
}
