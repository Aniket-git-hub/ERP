import express from 'express';
import addJobController from '../controllers/jobs/addJobsController.js';
import deleteJobController from '../controllers/jobs/deleteJobsController.js';
import getJobByIdController from '../controllers/jobs/getJobByIdController.js';
import getJobsByIdsController from '../controllers/jobs/getJobsByIdsController.js';
import getJobController from '../controllers/jobs/getJobsController.js';
import updateJobController from '../controllers/jobs/updateJobsController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/id/:jobId', verifyJWT, getJobByIdController);
router.get('/', verifyJWT, getJobController);
router.get('/ids', verifyJWT, getJobsByIdsController);
router.post('/', verifyJWT, addJobController);
router.put('/:jobId', verifyJWT, updateJobController);
router.delete('/:jobId', verifyJWT, deleteJobController);

export default router;
