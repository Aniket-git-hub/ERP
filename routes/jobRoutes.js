import express from 'express';
import addJobController from '../controllers/jobs/addJobsController.js';
import deleteJobController from '../controllers/jobs/deleteJobsController.js';
import getJobByIdController from '../controllers/jobs/getJobByIdController.js';
import getJobsByIdsController from '../controllers/jobs/getJobsByIdsController.js';
import getJobController from '../controllers/jobs/getJobsController.js';
import updateJobController from '../controllers/jobs/updateJobsController.js';

const router = express.Router();

router.get('/id/:jobId', getJobByIdController);
router.get('/', getJobController);
router.get('/ids', getJobsByIdsController);
router.post('/', addJobController);
router.put('/:jobId', updateJobController);
router.delete('/:jobId', deleteJobController);

export default router;
