import cors from 'cors';
import express from 'express';
import corsOptions from './config/corsOptions.js';
import errorHandler from './middleware/errorHandler.js';
import routes from './routes/index.js';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.get('/', (req, res) => res.send('Hello world'));

app.use(errorHandler);

export default app;