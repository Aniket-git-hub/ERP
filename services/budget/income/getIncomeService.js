import INCOME from '../../../models/budget/incomeModel.js';

async function getIncomeService(userId) {
    try {
        const income = await INCOME.findAll({
            where: {
                UserId: userId
            }
        });

        return income;
    } catch (error) {
        throw error;
    }
}

export default getIncomeService;
