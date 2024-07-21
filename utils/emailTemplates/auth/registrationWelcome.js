import getEnvVariable from "../../env.js"

export const registrationWelcomeEmail = (name) => {
    return `
       <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; color: #333; border: 1px solid #b8b8b8; border-radius:.3rem;">
            <h2 style="font-size: 24px;">Welcome to letsbug ERP!</h2>
            <p style="font-size: 18px;">Hello, ${name}</p>
            <p style="font-size: 18px;">We're thrilled to have you on board. letsbug ERP is designed to make your experience amazing.</p>
            <p style="font-size: 18px;">Check out the app and start exploring!</p>
            <a href="${getEnvVariable('APP_URL')}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #007BFF; text-decoration: none; font-size: 18px; border-radius: 5px;">Get Started</a>
            <p style="font-size: 18px;">Cheers,</p>
            <p style="font-size: 18px;">The letsbug ERP Team</p>
        </div>
    `
}