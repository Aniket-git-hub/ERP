import { Op } from 'sequelize';
import ATTENDANCE from '../../../models/employee/attendanceModel.js';
import CustomError from '../../../utils/createError.js';

async function addOutTimeService(
    userId,
    employeeId,
    attendanceId,
    attendanceData
) {
    try {
        // const employee = await ATTENDANCE.findByPk(attendanceId, {
        //     where: {
        //         employeeId,
        //         UserId: userId,
        //         inTime: {
        //             [Op.not]: null
        //         },
        //         outTime: null
        //     }
        // })
        // console.log(employee)
        // console.log(employeeId)
        // console.log(userId)
        // console.log(attendanceId)
        const attendance = await ATTENDANCE.update(attendanceData, {
            where: {
                id: attendanceId,
                employeeId,
                userId,
                inTime: {
                    [Op.not]: null
                },
                outTime: null
            }
        });
        if (attendance[0] === 0) {
            throw new CustomError('AttendanceError', "Couldn't update");
        }
        return attendance;
    } catch (error) {
        throw error;
    }
}

export default addOutTimeService;
