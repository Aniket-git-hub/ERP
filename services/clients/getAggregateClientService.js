import { Sequelize } from 'sequelize';
import CLIENT from "../../models/work/clientModel.js";
import INVOICE from "../../models/work/invoiceModel.js";


async function getAggregateClientService(userId, type, year, month) {
    try {
        const clientTotalAmounts = await CLIENT.findAll({
            attributes: ['id', 'name'],
            include: [{
                model: INVOICE,
                attributes: [
                    [
                        Sequelize.fn('COALESCE',
                            Sequelize.fn('SUM', Sequelize.col('totalAmountAfterTax')),
                            Sequelize.fn('SUM', Sequelize.col('totalAmountBeforeTax'))
                        ),
                        'totalAmount'
                    ]
                ],
                group: ['clientId']
            }],
            raw: true
        });

        return clientTotalAmounts;
    } catch (error) {
        throw error;
    }
}

export default getAggregateClientService;
