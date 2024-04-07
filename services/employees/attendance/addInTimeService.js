import { Op } from "sequelize";
import ATTENDANCE from "../../../models/employee/attendanceModel.js";
import CustomError from "../../../utils/createError.js";

async function addAttendanceService(userId, employeeId, punchType, checkTimestamp) {

    try {

        if (!(checkTimestamp instanceof Date)) {
            checkTimestamp = new Date(checkTimestamp);
        }

        const date = new Date(checkTimestamp.getFullYear(), checkTimestamp.getMonth(), checkTimestamp.getDate());

        const existingPunch = await ATTENDANCE.findOne({
            where: {
                userId,
                employeeId,
                checkTime: {
                    [Op.gte]: date,
                    [Op.lt]: new Date(date.getTime() + 24 * 60 * 60 * 1000)
                },
                punchType
            }
        });

        if (existingPunch) {
            throw new CustomError("AttendanceError", `A ${punchType} punch already exists for this employee on this date`);
        }


        if (punchType === 'out') {
            const punchIn = await ATTENDANCE.findOne({
                where: {
                    userId,
                    employeeId,
                    checkTime: {
                        [Op.gte]: date,
                        [Op.lt]: checkTimestamp
                    },
                    punchType: 'in'
                }
            });

            if (!punchIn) {
                throw new CustomError("AttendanceError", 'Cannot add a punch out without a corresponding punch in');
            }
        }

        const newPunch = await ATTENDANCE.create({ employeeId, checkTime: checkTimestamp, punchType, userId });

        return newPunch;

    } catch (error) {
        throw error;
    }
}

export default addAttendanceService;
