import USER from "../../models/work/userModel.js";

async function cancelResetRequestService(email) {
    const user = await USER.findOne({ where: { email } });
    if (!user) {
        throw new CustomError('UserNotFound', 'No user found with this email');
    }

    // Freeze user account logic here
    await USER.update({ accountStatus: 'frozen' }, { where: { email } });

    // send email about cancelation and account freezed

    logActivity(email, 'Password Reset Request Cancelled'); // Log the activity
}


export default cancelResetRequestService;