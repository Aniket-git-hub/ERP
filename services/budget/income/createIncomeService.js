import sequelize from '../../../config/database.js';
import INCOME from '../../../models/budget/incomeModel.js';
import { createTransactionService } from '../transactionService.js';

async function createIncomeService(
    userId,
    period,
    amount,
    invoiceIds,
    scrapSellIds
) {
    const transaction = await sequelize.transaction();

    try {
        const income = await INCOME.create(
            {
                userId,
                period,
                amount
            },
            { transaction }
        );

        if (invoiceIds && invoiceIds.length > 0) {
            await INCOME.addInvoices(invoiceIds, { transaction });
        }
        if (scrapSellIds && scrapSellIds.length > 0) {
            await INCOME.addScrapSell(scrapSellIds, { transaction });
        }

        await createTransactionService(
            userId,
            'credit',
            amount,
            new Date(),
            income.id,
            null,
            transaction
        );

        await transaction.commit();

        return income;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

export default createIncomeService;
