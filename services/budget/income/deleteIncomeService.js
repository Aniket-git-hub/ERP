import INCOME from '../../../models/budget/incomeModel.js';
import CustomError from '../../../utils/createError.js';

async function deleteIncomeService(userId, incomeId) {
    try {
        const income = await INCOME.findByPk(incomeId, {
            where: {
                UserId: userId
            }
        });

        if (!income) {
            throw new CustomError('IncomeError', 'Income not found');
        }

        await income.destroy();
        return { message: 'Income deleted successfully' };
    } catch (error) {
        throw error;
    }
}

export default deleteIncomeService;
