import DEPARTMENT from "../../../models/employee/departmentModel.js";
import DESIGNATION from "../../../models/employee/designationModel.js";
import CustomError from "../../../utils/createError.js";

export async function addDesignationService(userId, designationData) {
    try {
        const designation = await DESIGNATION.create({
            userId,
            ...designationData
        });
        return designation;
    } catch (error) {
        throw error;
    }
}

export async function updateDesignationService(
    userId,
    designationId,
    designationData
) {
    try {
        const [updatedRows] = await DESIGNATION.update(designationData, {
            where: {
                id: designationId,
                userId
            }
        });

        if (updatedRows === 0) {
            throw new CustomError(
                'DesignationError',
                `Designation with id ${designationId} not found.`
            );
        }

        const updatedDesignation = await DESIGNATION.findByPk(designationId);
        return updatedDesignation;
    } catch (error) {
        throw error;
    }
}

export async function deleteDesignationService(userId, designationId) {
    try {
        const deletedRows = await DESIGNATION.destroy({
            where: {
                id: designationId,
                userId
            }
        });

        if (deletedRows === 0) {
            throw new CustomError(
                'DesignationError',
                `Designation with id ${designationId} not found.`
            );
        }

        return { message: 'Designation deleted successfully.' };
    } catch (error) {
        throw error;
    }
}

export async function getAllDesignationsService(userId) {
    try {
        const designations = await DESIGNATION.findAll({
            where: { userId },
            include: [
                {
                    model: DEPARTMENT,
                    attributes: ['name', 'id'],
                }
            ],
            attributes: [
                'id', 'name', ['id', 'value'], ['name', 'label']
            ]
        });

        return designations
    } catch (error) {
        throw error;
    }
}

export async function getAllDesignationsByDepartmentService(userId) {
    try {
        const departments = await DEPARTMENT.findAll({
            where: { userId },
            include: [
                {
                    model: DESIGNATION,
                    attributes: ['name', 'id'],
                }
            ],
        });

        const grouped = {}

        departments.forEach(department => {
            if (!grouped[department.name]) {
                grouped[department.name] = []
            }
            department.designations.forEach(designation => {
                grouped[department.name].push({
                    name: designation.name,
                    id: designation.id,

                })
            })
        })

        const res = Object.keys(grouped).map(departmentName => ({
            department: departmentName,
            designations: grouped[departmentName]
        }))

        return res
    } catch (error) {
        throw error;
    }
}

export async function getDesignationByIdService(userId, designationId) {
    try {

        const designation = await DESIGNATION.findByPk(designationId, {
            where: { userId }
        });

        if (!designation) {
            throw new CustomError(
                'DesignationError',
                `Designation with id ${designationId} not found.`
            );
        }

        return designation;
    } catch (error) {
        throw error;
    }
}
