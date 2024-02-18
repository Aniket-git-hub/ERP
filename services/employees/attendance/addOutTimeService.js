import { Op } from "sequelize"
import ATTENDANCE from "../../../models/employee/attendanceModel.js"
import CustomError from "../../../utils/createError.js"

async function addOutTimeService(userId, employeeId, attendanceId, attendanceData) {

    try {

        const attendance = await ATTENDANCE.update(attendanceData, {
            where: {
                employeeId: employeeId,
                UserId: userId,
                id: attendanceId,
                inTime: {
                    [Op.not]: "00:00:00"
                },
                outTime: "00:00:00"
            }
        })
        if (attendance[0] === 0) {
            throw new CustomError("AttendanceError", "Couldn't update")
        }
        return attendance
    } catch (error) {
        throw error
    }
}

export default addOutTimeService