import { getTransactionService } from '../../services/budget/transactionService.js';

export async function getTransactionController(req, res, next) {
    const { userId } = req.user;
    try {
        const transactions = await getTransactionService(userId);
        res.json({ transactions });
    } catch (error) {
        next(error);
    }
}
