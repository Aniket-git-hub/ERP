import app from "./app.js";
import syncDatabase from "./models/index.js";


const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await syncDatabase();
        app.listen(PORT, () => {
            console.log(`[server] listening on port ${PORT}...`);
        });
    } catch (error) {
        console.error('[server] Error starting server:', error);
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
}

startServer();