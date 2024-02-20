import EXPENSE_CATEGORY from '../../models/budget/expenseCategoryModel.js';
import CustomError from '../../utils/createError.js';

export async function createExpenseCategoryService(userId, name) {
    try {
        const expenseCategory = await EXPENSE_CATEGORY.create({
            name,
            UserId: userId
        });
        return expenseCategory;
    } catch (error) {
        throw error;
    }
}

export async function updateExpenseCategoryService(
    userId,
    expenseCategoryId,
    newName
) {
    try {
        const expenseCategory = await EXPENSE_CATEGORY.findByPk(
            expenseCategoryId,
            {
                where: {
                    UserId: userId
                }
            }
        );

        if (!expenseCategory) {
            throw new CustomError('ExpenseError', 'Expense category not found');
        }

        expenseCategory.name = newName;
        await expenseCategory.save();

        return expenseCategory;
    } catch (error) {
        throw error;
    }
}

export async function deleteExpenseCategoryService(userId, expenseCategoryId) {
    try {
        const expenseCategory = await EXPENSE_CATEGORY.findByPk(
            expenseCategoryId,
            {
                where: {
                    UserId: userId
                }
            }
        );

        if (!expenseCategory) {
            throw new CustomError('ExpenseError', 'Expense category not found');
        }

        await expenseCategory.destroy();
        return { message: 'Expense category deleted successfully' };
    } catch (error) {
        throw error;
    }
}

export async function getExpenseCategoriesService(userId) {
    try {
        const expenseCategories = await EXPENSE_CATEGORY.findAll({
            where: {
                UserId: userId
            }
        });

        return expenseCategories;
    } catch (error) {
        throw error;
    }
}
