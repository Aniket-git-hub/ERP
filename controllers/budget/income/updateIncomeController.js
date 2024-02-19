import updateIncomeService from "../../../services/budget/income/updateIncomeService.js";

async function updateIncomeController(req, res, next) {
    const { incomeId } = req.params;
    const newData = req.body;
    const { userId } = req.user
    try {
        const updatedIncome = await updateIncomeService(userId, incomeId, newData);
        res.json({
            income: updatedIncome,
            message: "Income updated successfully"
        });
    } catch (error) {
        next(error);
    }
}

export default updateIncomeController;