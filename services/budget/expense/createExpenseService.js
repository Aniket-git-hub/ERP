import sequelize from '../../../config/database.js';
import EXPENSE from '../../../models/budget/expenseModel.js';
import { createTransactionService } from '../transactionService.js';

async function createExpenseService(
    userId,
    description,
    amount,
    date,
    expenseCategory
) {
    const transaction = await sequelize.transaction();
    try {
        const expense = await EXPENSE.create(
            {
                description,
                amount,
                date,
                UserId: userId,
                expenseCategoryId: expenseCategory
            },
            { transaction }
        );

        await createTransactionService(
            userId,
            'debit',
            amount,
            new Date(),
            null,
            expense.id,
            transaction
        );

        await transaction.commit();

        return expense;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

export default createExpenseService;
