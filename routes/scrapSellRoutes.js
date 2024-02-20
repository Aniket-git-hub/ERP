import express from 'express';
import {
    addScrapSellController,
    deleteScrapSellController,
    getAllScrapSellsController,
    getScrapSellByIdController,
    updateScrapSellController
} from '../controllers/budget/scrapSellController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/', verifyJWT, getAllScrapSellsController);
router.get('/:scrapSellId', verifyJWT, getScrapSellByIdController);
router.post('/', verifyJWT, addScrapSellController);
router.put('/:scrapSellId', verifyJWT, updateScrapSellController);
router.delete('/:scrapSellId', verifyJWT, deleteScrapSellController);

export default router;
