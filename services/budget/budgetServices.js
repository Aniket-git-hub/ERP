import BUDGET from '../../models/budget/budgetModel.js';
import CustomError from '../../utils/createError.js';

export async function createBudgetService(
    userId,
    amount,
    date,
    expenseCategory
) {
    try {
        const budget = await BUDGET.create({
            UserId: userId,
            amount,
            date,
            expenseCategoryId: expenseCategory
        });
        return budget;
    } catch (error) {
        throw error;
    }
}

export async function updateBudgetService(userId, budgetId, newData) {
    try {
        const [updatedRowsCount] = await BUDGET.update(newData, {
            where: {
                id: budgetId,
                UserId: userId
            }
        });

        if (updatedRowsCount === 0) {
            throw new CustomError('BudgetError', 'Budget not found');
        }

        const updatedBudget = await BUDGET.findByPk(budgetId, {
            where: {
                UserId: userId
            }
        });
        return updatedBudget;
    } catch (error) {
        throw error;
    }
}

export async function deleteBudgetService(userId, budgetId) {
    try {
        const budget = await BUDGET.findByPk(budgetId, {
            where: {
                UserId: userId
            }
        });

        if (!budget) {
            throw new CustomError('BudgetError', 'Budget not found');
        }

        await budget.destroy();
        return { message: 'Budget deleted successfully' };
    } catch (error) {
        throw error;
    }
}

export async function getBudgetService(userId) {
    try {
        const budget = await BUDGET.findAll({
            where: { UserId: userId }
        });

        return budget;
    } catch (error) {
        throw error;
    }
}
