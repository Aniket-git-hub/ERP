const sendVerifyEmail = (name, verificationUrl) => {
    return `
        <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; color: #333; border: 1px solid #b8b8b8; border-radius:.3rem;">
    <h2 style="font-size: 24px;">Verify Your Email Address</h2>
    <p style="font-size: 18px;">Hello, ${name}</p>
    <p style="font-size: 18px;">Thank you for registering with letsbug ERP. Please verify your email address by clicking the button below:</p>
    <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #007BFF; text-decoration: none; font-size: 18px; border-radius: 5px;">Verify Email</a>
    <p style="font-size: 18px;">If you did not create an account with us, you can ignore this email.</p>
    <p style="font-size: 18px;">Best regards,</p>
    <p style="font-size: 18px;">The letsbug ERP Team</p>
</div>
    `
}