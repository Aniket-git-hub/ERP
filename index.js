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

// syncing the db
syncDatabase();

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

import invoiceRoutes from './routes/invoiceRoutes.js';
app.use('/api/invoice', invoiceRoutes);

import employeeRoutes from './routes/employeeRoutes.js';
app.use('/api/employee', employeeRoutes)

import attendanceRoutes from "./routes/attendanceRoute.js";
app.use('/api/attendance', attendanceRoutes)

import advanceRoutes from "./routes/advanceRoutes.js";
app.use('/api/advance', advanceRoutes)

import scrapSellRoutes from './routes/scrapSellRoutes.js';
app.use('/api/scrap-sell', scrapSellRoutes)

import getDashboardData from './controllers/dashboard/getDashboardData.js';
app.get('/api/dashboard', getDashboardData)

app.get('/', (req, res) => res.send('Hello world'));

import syncDatabase from './dbInitializations.js';
import errorHandler from './middleware/errorHandler.js';
app.use(errorHandler);

app.listen(PORT, () => {
    console.log('[server] listening on port ' + PORT + '...');
});