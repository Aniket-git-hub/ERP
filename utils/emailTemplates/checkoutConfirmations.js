function checkoutConfirmationTemplate(username) {
    return `
    <section style="font-family: 'Arial', sans-serif; background-color: #f5f5f5; padding: 20px;">

        <div style="background-color: #fff; border-radius: 10px; padding: 20px;">
            <h1 style="color: #333;">Attendance Confirmation Required</h1>
            <p style="line-height: 1.5; color: #666;">Hello ${username},</p>
            <p style="line-height: 1.5; color: #666;">Your attendance check-out was after the allowed limit. Please confirm the late check-out to update your records.</p>
            <div style="margin-top: 20px; text-align: center;">
                <a href="[CONFIRMATION_LINK]" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirm Late Check-Out</a>
            </div>
            <p style="line-height: 1.5; color: #666;">If you did not perform this action or have any concerns, please contact the administrator.</p>
            <p style="line-height: 1.5; color: #666;">Thank you,</p>
            <p style="line-height: 1.5; color: #666;">Madhu Enterprises</p>
        </div>

    </section>
    `;
}
