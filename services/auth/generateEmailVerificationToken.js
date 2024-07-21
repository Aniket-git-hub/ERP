import jwt from "jsonwebtoken";

const generateVerificationToken = (userId) => {
    const token = jwt.sign({ userId }, getEnvVariable('JWT_SECRET'), { expiresIn: '30m' });
    return token;
};

async function sendVerificationEmailService(user) {
    const token = generateVerificationToken(user.id);
    user.emailVerificationToken = token;
    await user.save();

    // email

};

export default sendVerificationEmailService;