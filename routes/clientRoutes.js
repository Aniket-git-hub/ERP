import express from 'express';
import addClientController from '../controllers/clients/addClientController.js';
import deleteClientController from '../controllers/clients/deleteClientController.js';
import getClientByIdController from '../controllers/clients/getClientByIdController.js';
import getFilteredClientsController from '../controllers/clients/getFilteredClientsController.js';
import updateClientController from '../controllers/clients/updateClientController.js';

const router = express.Router();

router.get('/:clientId', getClientByIdController);
router.get('/', getFilteredClientsController);
router.post('/', addClientController);
router.put('/:clientId', updateClientController);
router.delete('/:clientId', deleteClientController);

export default router;
