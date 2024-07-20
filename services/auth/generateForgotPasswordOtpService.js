import OTP from "../../models/work/otpModel.js";
import USER from "../../models/work/userModel.js";
import CustomError from "../../utils/createError.js";

const OTP_REQUEST_LIMIT = 5;
const OTP_REQUEST_WINDOW_MS = 15 * 60 * 1000;

async function generateForgotPasswordOtpService(email) {
    // Check if the email has exceeded the OTP request limit
    const recentRequests = await OTP.count({
        where: {
            email,
            createdAt: {
                [Op.gt]: new Date(Date.now() - OTP_REQUEST_WINDOW_MS),
            },
        },
    });

    if (recentRequests >= OTP_REQUEST_LIMIT) {
        throw new CustomError('RateLimitExceeded', 'Too many OTP requests. Please try again later.');
    }

    const user = await USER.findOne({ where: { email } });
    if (!user) {
        throw new CustomError('UserNotFound', 'No user found with this email');
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiry

    await OTP.create({ email, otp, expiresAt });

    // SEND OTP VIA EMAIL HERE
}


export default generateForgotPasswordOtpService;