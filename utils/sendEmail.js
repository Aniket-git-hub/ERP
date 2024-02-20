import transporter from '../config/nodemailer.js';
import getEnvVariable from './env.js';

async function sendEmail(email, subject, template) {
    const mailOptions = {
        from: getEnvVariable('NODEMAILER_USER'),
        to: email,
        subject: subject,
        html: template
    };
    try {
        const response = await transporter.sendMail(mailOptions);
        return { response };
    } catch (error) {
        throw error;
    }
}

export default sendEmail;
