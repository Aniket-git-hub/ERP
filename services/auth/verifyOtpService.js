import OTP from "../../models/work/otpModel.js";
import USER from "../../models/work/userModel.js";
import CustomError from "../../utils/createError.js";

async function verifyOtpService(email, otp) {
    const otpRecord = await OTP.findOne({ where: { email, otp } });

    if (!otpRecord) {
        await USER.increment('failedOtpAttempts', { where: { email } });

        const user = await USER.findOne({ where: { email } });
        if (user.failedOtpAttempts >= MAX_FAILED_ATTEMPTS) {
            await USER.update({ accountStatus: 'frozen' }, { where: { email } });
            throw new CustomError('AccountFrozen', 'Too many failed OTP attempts. Your account has been frozen.');
        }

        throw new CustomError('InvalidOTP', 'Invalid OTP code');
    }

    if (new Date() > new Date(otpRecord.expiresAt)) {
        throw new CustomError('OTPExpired', 'OTP code has expired');
    }

    await OTP.destroy({ where: { email, otp } }); // Delete OTP record after use
    await USER.update({ failedOtpAttempts: 0 }, { where: { email } }); // Reset failed attempts

    logActivity(email, 'OTP Verified'); // Log the activity
}

export default verifyOtpService;