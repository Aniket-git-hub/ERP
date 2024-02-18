import ADVANCE from "../../../models/employee/advanceModel.js"

async function deleteAdvanceService(userId, employeeId, advanceId) {
    try {
        const deletedAdvance = await ADVANCE.destroy({
            where: {
                UserId: userId,
                employeeId,
                id: advanceId
            }
        })
        return deletedAdvance
    } catch (error) {
        throw error
    }
}

export default deleteAdvanceService