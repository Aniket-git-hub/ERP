import DEPARTMENT from "../../../models/employee/departmentModel.js";
import CustomError from "../../../utils/createError.js";

export async function addDepartmentService(userId, departmentData) {
    try {
        const department = await DEPARTMENT.create({
            userId,
            ...departmentData
        });
        return department;
    } catch (error) {
        throw error;
    }
}

export async function updateDepartmentService(
    userId,
    departmentId,
    departmentData
) {
    try {
        const [updatedRows] = await DEPARTMENT.update(departmentData, {
            where: {
                id: departmentId,
                userId
            }
        });

        if (updatedRows === 0) {
            throw new CustomError(
                'departmentError',
                `Department with id ${departmentId} not found.`
            );
        }

        const updatedDepartment = await DEPARTMENT.findByPk(departmentId);
        return updatedDepartment;
    } catch (error) {
        throw error;
    }
}

export async function deleteDepartmentService(userId, departmentId) {
    try {
        const deletedRows = await DEPARTMENT.destroy({
            where: {
                id: departmentId,
                userId
            }
        });

        if (deletedRows === 0) {
            throw new CustomError(
                'departmentError',
                `department with id ${departmentId} not found.`
            );
        }

        return { message: 'department deleted successfully.' };
    } catch (error) {
        throw error;
    }
}

export async function getAllDepartmentsService(userId) {
    try {
        const departments = await DEPARTMENT.findAll({
            where: { userId },
            attributes: [
                ['id', 'value'],
                ['id', 'id'],
                ['name', 'label'],
                ['name', 'name']
            ]
        });

        return departments;
    } catch (error) {
        throw error;
    }
}

export async function getDepartmentByIdService(userId, departmentId) {
    try {

        const department = await DEPARTMENT.findByPk(departmentId, {
            where: { userId }
        });

        if (!department) {
            throw new CustomError(
                'departmentError',
                `department with id ${departmentId} not found.`
            );
        }

        return department;
    } catch (error) {
        throw error;
    }
}
