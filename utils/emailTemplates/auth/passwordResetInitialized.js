
export const passwordResetInitialized = (name) => {
    return `
       <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; color: #333;  border: 1px solid #b8b8b8; border-radius:.3rem;">
        <h2 style="font-size: 24px;">Password Reset Initiated</h2>
        <p style="font-size: 18px;">Hello, ${name}</p>
        <p style="font-size: 18px;">We received a request to reset your password. If you didn't make the request, use the below button to cancel the process.</p>
        <a href="#" style="display: inline-block; padding: 10px 20px; color: white; background-color: #007BFF; text-decoration: none;">Cancel Password Reset</a>
        <p style="font-size: 18px;">Thank you,</p>
        <p style="font-size: 18px;">Team letsbug ERP</p>
    </div>
    `
}