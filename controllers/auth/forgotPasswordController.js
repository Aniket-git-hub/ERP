import generateForgotPasswordOtpService from "../../services/auth/generateForgotPasswordOtpService.js";
import { sendOTPEmail } from "../../utils/emailTemplates/auth/sendOtpEmail.js";
import sendEmail from "../../utils/sendEmail.js";

async function forgotPasswordController(req, res, next) {
    const { email } = req.body;
    try {

        const savedOTP = await generateForgotPasswordOtpService(email)

        await sendEmail(savedOTP.email, "Password Reset OTP - letsbug ERP", sendOTPEmail("Aniket", savedOTP.otp))

        res.send({
            message: `OTP sent on ${savedOTP.email} use it before 2 mins`
        })

    } catch (error) {
        next(error)
    }
}


export default forgotPasswordController;