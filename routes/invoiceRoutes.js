import express from 'express';
import createInvoiceController from '../controllers/invoices/createInvoiceController.js';
import deleteInvoiceController from '../controllers/invoices/deleteInvoiceController.js';
import generateInvoicePdfController from '../controllers/invoices/generateInvoicePdfController.js';
import getFilteredInvoiceController from '../controllers/invoices/getFilteredInvoiceController.js';
import getInvoiceByIdController from '../controllers/invoices/getInvoiceByIdController.js';
import updateInvoiceController from '../controllers/invoices/updateInvoiceController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/:invoiceId', verifyJWT, getInvoiceByIdController);
router.get('/', verifyJWT, getFilteredInvoiceController);
router.get('/generatePdf/:invoiceId', verifyJWT, generateInvoicePdfController);
router.post('/', verifyJWT, createInvoiceController);
router.put('/:invoiceId', verifyJWT, updateInvoiceController);
router.delete('/:invoiceId', verifyJWT, deleteInvoiceController);

export default router;
