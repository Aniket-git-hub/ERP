import INCOME from '../../../models/budget/incomeModel.js';
import CustomError from '../../../utils/createError.js';

async function updateIncomeService(userId, incomeId, newData) {
    try {
        const [updatedRowsCount] = await INCOME.update(newData, {
            where: {
                id: incomeId,
                userId
            }
        });

        if (updatedRowsCount === 0) {
            throw new CustomError('IncomeError', 'Income not found');
        }

        const updatedIncome = await INCOME.findByPk(incomeId, { where: { userId } });
        return updatedIncome;
    } catch (error) {
        throw error;
    }
}

export default updateIncomeService;
