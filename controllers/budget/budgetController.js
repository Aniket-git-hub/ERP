import { createBudgetService, deleteBudgetService, getBudgetService, updateBudgetService } from "../../services/budget/budgetServices.js";

export async function createBudgetController(req, res, next) {
    const { amount, date, expenseCategoryId } = req.body;
    const { userId } = req.user
    try {
        const budget = await createBudgetService(userId, amount, date, expenseCategoryId);
        res.status(201).json({
            budget,
            message: "Budget created successfully"
        });
    } catch (error) {
        next(error);
    }
}

export async function updateBudgetController(req, res, next) {
    const { budgetId } = req.params;
    const { userId } = req.user
    const newData = req.body;
    try {
        const updatedBudget = await updateBudgetService(userId, budgetId, newData);
        res.json({
            updatedBudget,
            message: "Budget updated successfully"
        });
    } catch (error) {
        next(error);
    }
}

export async function getBudgetController(req, res, next) {
    const { budgetId } = req.params;
    const { userId } = req.user
    try {
        const budgets = await getBudgetService(userId, budgetId);
        res.json({
            budgets
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteBudgetController(req, res, next) {
    const { budgetId } = req.params;
    const { userId } = req.user
    try {
        await deleteBudgetService(userId, budgetId);
        res.json({
            message: 'Budget deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}