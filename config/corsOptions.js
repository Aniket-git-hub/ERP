import getEnvVariable from "../utils/env.js";

const allowedOrigins = getEnvVariable('ALLOWED_ORIGINS').split(',');

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`${origin} not allowed by cors`));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};

export default corsOptions;