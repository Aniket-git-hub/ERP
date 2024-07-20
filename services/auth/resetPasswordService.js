import bcrypt from 'bcrypt';
import USER from "../../models/work/userModel.js";
import CustomError from "../../utils/createError.js";

async function resetPasswordService(email, newPassword) {
    const user = await USER.findOne({ where: { email } });

    if (!user) {
        throw new CustomError('UserNotFound', 'No user found with this email');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await USER.update({ password: hashedPassword }, { where: { email } });

    // Send password reset email

}

export default resetPasswordService;