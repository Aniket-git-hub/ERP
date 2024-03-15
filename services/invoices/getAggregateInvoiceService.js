import { Op, Sequelize } from 'sequelize';
import CLIENT from "../../models/work/clientModel.js";
import INVOICE from "../../models/work/invoiceModel.js";


async function getAggregateInvoiceService(userId, type, year, month) {
    try {
        let whereCondition = {
            userId: userId
        };

        if (type === 'monthly') {
            whereCondition.createdAt = {
                [Op.gte]: new Date(year, month - 1, 1),
                [Op.lt]: new Date(year, month, 1)
            };
        } else if (type === 'yearly') {
            whereCondition.createdAt = {
                [Op.gte]: new Date(year, 0, 1),
                [Op.lt]: new Date(year + 1, 0, 1)
            };
        }

        // Total number of invoices
        const totalInvoices = await INVOICE.count({
            where: whereCondition
        });

        // Total, average, min, and max of totalAmountBeforeTax, totalTaxAmount, and totalAmountAfterTax
        const invoiceStats = await INVOICE.findAll({
            where: whereCondition,
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('totalAmountBeforeTax')), 'totalAmountBeforeTax'],
                [Sequelize.fn('AVG', Sequelize.col('totalAmountBeforeTax')), 'avgAmountBeforeTax'],
                [Sequelize.fn('MIN', Sequelize.col('totalAmountBeforeTax')), 'minAmountBeforeTax'],
                [Sequelize.fn('MAX', Sequelize.col('totalAmountBeforeTax')), 'maxAmountBeforeTax'],
                [Sequelize.fn('SUM', Sequelize.col('totalTaxAmount')), 'totalTaxAmount'],
                [Sequelize.fn('AVG', Sequelize.col('totalTaxAmount')), 'avgTaxAmount'],
                [Sequelize.fn('MIN', Sequelize.col('totalTaxAmount')), 'minTaxAmount'],
                [Sequelize.fn('MAX', Sequelize.col('totalTaxAmount')), 'maxTaxAmount'],
                [Sequelize.fn('SUM', Sequelize.col('totalAmountAfterTax')), 'totalAmountAfterTax'],
                [Sequelize.fn('AVG', Sequelize.col('totalAmountAfterTax')), 'avgAmountAfterTax'],
                [Sequelize.fn('MIN', Sequelize.col('totalAmountAfterTax')), 'minAmountAfterTax'],
                [Sequelize.fn('MAX', Sequelize.col('totalAmountAfterTax')), 'maxAmountAfterTax']
            ]
        });

        // Total number of invoices for each client
        const invoicesPerClient = await INVOICE.findAll({
            where: whereCondition,
            include: CLIENT,
            group: ['client.id'],
            attributes: ['client.id', [Sequelize.fn('COUNT', 'client.id'), 'invoiceCount']]
        });

        // Invoice with the highest total
        const highestTotalInvoice = await INVOICE.findOne({
            where: whereCondition,
            order: [[Sequelize.col('totalAmountAfterTax'), 'DESC']]
        });

        // Monthly data for`` invoices over the year
        const monthlyInvoiceData = await INVOICE.findAll({
            where: whereCondition,
            attributes: [
                [Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'month'],
                [Sequelize.fn('SUM', Sequelize.col('totalAmountAfterTax')), 'totalAmount'],
                [Sequelize.fn('SUM', Sequelize.col('totalQuantity')), 'totalQuantity']
            ],
            group: [Sequelize.fn('MONTH', Sequelize.col('createdAt'))],
            order: [[Sequelize.fn('MONTH', Sequelize.col('createdAt'))]]
        });

        return {
            totalInvoices,
            invoiceStats: invoiceStats[0].dataValues,
            invoicesPerClient,
            highestTotalInvoice,
            monthlyInvoiceData,
        };

    } catch (error) {
        throw error;
    }
}

export default getAggregateInvoiceService;
