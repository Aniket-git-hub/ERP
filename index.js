import express from 'express';
import getEnvVariable from './utils/env.js';

const app = express();
const PORT = process.env.PORT || 3000;

import cors from 'cors';
const allowedOrigins = getEnvVariable('ALLOWED_ORIGINS').split(',');
app.use(
    cors({
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
    })
);
app.use(cors());

import sequelize from './config/database.js';
sequelize
    .sync({ force: false })
    .then(() => {
        console.log('[database] synced successfully');
    })
    .catch((error) => {
        console.error('[database] Error syncing database:', error);
    });

import CLIENT from './models/clientModel.js';
import JOB from './models/jobModel.js';
import MATERIAL from './models/materialModel.js';
MATERIAL.hasMany(JOB);
CLIENT.hasMany(JOB);
JOB.belongsTo(CLIENT);
JOB.belongsTo(MATERIAL);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

import authRoutes from './routes/authRoutes.js';
app.use('/api/auth', authRoutes);

import clientRoutes from './routes/clientRoutes.js';
app.use('/api/client', clientRoutes);

import materialRoutes from './routes/materialRoutes.js';
app.use('/api/material', materialRoutes);

import jobRoutes from './routes/jobRoutes.js';
app.use('/api/job', jobRoutes);

app.get('/', (req, res) => res.send('Hello world'));

import errorHandler from './middleware/errorHandler.js';
app.use(errorHandler);

app.listen(PORT, () => {
    console.log('[server] listening on port ' + PORT + '...');
});