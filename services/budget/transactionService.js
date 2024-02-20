import TRANSACTIONS from '../../models/budget/transactions.js';
import CustomError from '../../utils/createError.js';

export async function createTransactionService(
    userId,
    type,
    amount,
    date,
    incomeId = null,
    expenseId = null,
    transaction
) {
    try {
        const t = await TRANSACTIONS.create(
            {
                userId,
                type,
                amount,
                date,
                incomeId,
                expenseId
            },
            { transaction }
        );
        return t;
    } catch (error) {
        throw error;
    }
}

export async function updateTransactionService(userId, transactionId, newData) {
    try {
        const [updatedRowsCount] = await TRANSACTIONS.update(newData, {
            where: {
                id: transactionId,
                userId
            }
        });

        if (updatedRowsCount === 0) {
            throw new CustomError('TransactionError', 'Transaction not found');
        }

        const updatedTransaction = await TRANSACTIONS.findByPk(transactionId, {
            where: {
                userId
            }
        });
        return updatedTransaction;
    } catch (error) {
        throw error;
    }
}

export async function getTransactionService(userId) {
    try {
        const transaction = await TRANSACTIONS.findAll({
            where: {
                userId
            }
        });

        return transaction;
    } catch (error) {
        throw error;
    }
}

export async function deleteTransactionService(userId, transactionId) {
    try {
        const transaction = await TRANSACTIONS.findByPk(transactionId, {
            where: {
                userId
            }
        });

        if (!transaction) {
            throw new CustomError('TransactionError', 'Transaction not found');
        }

        await transaction.destroy();
        return { message: 'Transaction deleted successfully' };
    } catch (error) {
        throw error;
    }
}
