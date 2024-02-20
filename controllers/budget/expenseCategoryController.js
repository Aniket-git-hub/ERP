import {
    createExpenseCategoryService,
    deleteExpenseCategoryService,
    getExpenseCategoriesService,
    updateExpenseCategoryService
} from '../../services/budget/expenseCategoryServices.js';

export async function createExpenseCategoryController(req, res, next) {
    const { name } = req.body;
    const { userId } = req.user;
    try {
        const expenseCategory = await createExpenseCategoryService(
            userId,
            name
        );

        res.status(201).json({
            expenseCategory,
            message: 'Expense Category created successfully'
        });
    } catch (error) {
        next(error);
    }
}

export async function updateExpenseCategoryController(req, res, next) {
    const { userId } = req.user;
    const { expenseCategoryId } = req.params;
    const { name } = req.body;
    try {
        const expenseCategory = await updateExpenseCategoryService(
            userId,
            expenseCategoryId,
            name
        );
        res.json({
            expenseCategory: expenseCategory,
            message: 'Expense Category updated successfully'
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteExpenseCategoryController(req, res, next) {
    const { expenseCategoryId } = req.params;
    const { userId } = req.user;
    try {
        await deleteExpenseCategoryService(userId, expenseCategoryId);
        res.json({
            message: 'Expense category deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

export async function getExpenseCategoriesController(req, res, next) {
    const { userId } = req.user;
    try {
        const expenseCategories = await getExpenseCategoriesService(userId);
        res.json({
            expenseCategories
        });
    } catch (error) {
        next(error);
    }
}
