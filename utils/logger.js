import fs from 'fs';
import path from 'path';

const logFilePath = path.join(__dirname, '../../logs/activity.log');

export function logActivity(email, action) {
    const logEntry = `${new Date().toISOString()} - ${email} - ${action}\n`;
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
}
