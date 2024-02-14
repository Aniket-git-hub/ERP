import { Op, Sequelize } from "sequelize";
import INVOICE from "../../models/invoiceModel.js";
import JOB from "../../models/jobModel.js";

async function createInvoiceService(
    jobIds,
    userId,
    clientId,
    invoiceType,
    invoiceDate,
    cGstPercentage,
    iGstPercentage,
    sGstPercentage,
    notes,
    totalQuantity,
    totalAmount
) {
    try {
        let totalAmountBeforeTax = +totalAmount;
        let totalQuantityBilled = +totalQuantity;
        let jobs = [];

        if (jobIds && jobIds.length > 0) {
            jobs = await JOB.findAll({
                where: { id: { [Op.in]: jobIds }, ClientId: clientId },
                attributes: [
                    [Sequelize.fn('sum', Sequelize.col('quantity')), 'totalQuantity'],
                    [
                        Sequelize.fn('sum', Sequelize.literal('(quantity * (millingRate + drillingRate))')),
                        'totalAmount'
                    ]
                ],
                raw: true,
            });

            totalAmountBeforeTax = parseFloat(jobs[0].totalAmount);
            totalQuantityBilled = parseInt(jobs[0].totalQuantity);
        }

        const invoice = await INVOICE.create({
            invoiceType,
            invoiceDate,
            totalQuantity: totalQuantityBilled,
            ClientId: clientId,
            UserId: userId,
            cGstPercentage,
            iGstPercentage,
            sGstPercentage,
            totalAmountBeforeTax,
            notes,
        });

        await invoice.addJobs(jobs);

        return invoice;
    } catch (error) {
        throw error
    }
}

export default createInvoiceService;
