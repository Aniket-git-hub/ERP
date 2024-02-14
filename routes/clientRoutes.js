import express from 'express';
import addClientController from '../controllers/clients/addClientController.js';
import deleteClientController from '../controllers/clients/deleteClientController.js';
import getClientByIdController from '../controllers/clients/getClientByIdController.js';
import getFilteredClientsController from '../controllers/clients/getFilteredClientsController.js';
import updateClientController from '../controllers/clients/updateClientController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/:clientId', verifyJWT, getClientByIdController);
router.get('/', verifyJWT, getFilteredClientsController);
router.post('/', verifyJWT, addClientController);
router.put('/:clientId', verifyJWT, updateClientController);
router.delete('/:clientId', verifyJWT, deleteClientController);

export default router;
