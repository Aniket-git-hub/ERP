import express from 'express';
import createInvoiceController from '../controllers/invoices/createInvoiceController.js';
import deleteInvoiceController from '../controllers/invoices/deleteInvoiceController.js';
import generateInvoicePdfController from '../controllers/invoices/generateInvoicePdfController.js';
import getFilteredInvoiceController from '../controllers/invoices/getFilteredInvoiceController.js';
import getInvoiceByIdController from '../controllers/invoices/getInvoiceByIdController.js';
import updateInvoiceController from '../controllers/invoices/updateInvoiceController.js';

const router = express.Router();

router.get('/:invoiceId', getInvoiceByIdController);
router.get('/', getFilteredInvoiceController);
router.get('/generatePdf/:invoiceId', generateInvoicePdfController);
router.post('/', createInvoiceController);
router.put('/:invoiceId', updateInvoiceController);
router.delete('/:invoiceId', deleteInvoiceController);

export default router;
