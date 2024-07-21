import OTP from "../../models/work/otpModel.js";
import USER from "../../models/work/userModel.js";
import CustomError from "../../utils/createError.js";
// import logActivity from "../../utils/logActivity.js";

const MAX_FAILED_ATTEMPTS = 3

async function verifyOtpService(email, otp) {
    const otpRecord = await OTP.findOne({ where: { email, otp } });

    if (!otpRecord) {
        await USER.increment('failedOtpAttempts', { where: { email } });

        const user = await USER.findOne({ where: { email } });
        if (user.failedOtpAttempts >= MAX_FAILED_ATTEMPTS) {
            await USER.update({ accountStatus: 'frozen' }, { where: { email } });
            logActivity(email, 'Account frozen due to too many failed OTP attempts');
            throw new CustomError('AccountFrozen', 'Too many failed OTP attempts. Your account has been frozen.');
        }

        logActivity(email, 'Invalid OTP attempt');
        throw new CustomError('InvalidOTP', 'Invalid OTP code');
    }

    if (new Date() > new Date(otpRecord.expiresAt)) {
        logActivity(email, 'Expired OTP attempt');
        throw new CustomError('OTPExpired', 'OTP code has expired');
    }

    await OTP.destroy({ where: { email, otp } });
    await USER.update({ failedOtpAttempts: 0 }, { where: { email } });

    // logActivity(email, 'OTP Verified');

}

export default verifyOtpService;
