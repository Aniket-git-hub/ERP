import jwt from "jsonwebtoken";
import USER from "../../models/work/userModel.js";
import CustomError from "../../utils/createError.js";

async function verifyEmailToken(token) {
    try {
        const decoded = jwt.verify(token, getEnvVariable('JWT_SECRET'));
        const user = await USER.findByPk(decoded.userId);
        if (!user) {
            throw new CustomError('UserNotFound', 'User not found');
        }

        if (user.emailVerificationToken !== token) {
            throw new CustomError('InvalidToken', 'Invalid email verification token');
        }

        user.accountStatus = 'active';
        user.emailVerificationToken = null;
        await user.save();

        logActivity(user.email, 'Email verified and account activated');
        return user;
    } catch (error) {
        throw error;
    }
};


export default verifyEmailToken;