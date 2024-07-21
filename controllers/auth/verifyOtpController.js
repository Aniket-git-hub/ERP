import verifyOtpService from "../../services/auth/verifyOtpService.js";

async function verifyOtpController(req, res, next) {
    const { email, otp } = req.body;
    try {
        await verifyOtpService(email, otp)
        res.status(200).json({ message: "OTP verified successfully." });
    } catch (error) {
        next(error)
    }
}


export default verifyOtpController;