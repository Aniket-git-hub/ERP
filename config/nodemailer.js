import nodemailer from 'nodemailer';
import getEnvVariable from '../utils/env.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: getEnvVariable('NODEMAILER_USER'),
        pass: getEnvVariable('NODEMAILER_PASS'),
    },
});

export default transporter