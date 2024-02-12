import { Op } from "sequelize";
import INVOICE from "../../models/invoiceModel.js";
import JOB from "../../models/jobModel.js";
import getCurrentMonthDates from "../../utils/getCurrentMonthDate.js";


async function getDashboardDataService() {
    try {

        const { startDate, endDate } = getCurrentMonthDates()

        //  total invoices created in the current month
        const totalInvoices = await INVOICE.count({
            where: {
                invoiceDate: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate,
                }
            }
        });

        const totalInvoicesAmount = await INVOICE.sum('totalAmountAfterTax', {
            where: {
                createdAt: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate,
                }
            }
        })

        const totalQuantity = await JOB.sum('quantity', {
            where: {
                createdAt: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate,
                }
            }
        })

        const totalJobs = await JOB.count({
            where: {
                createdAt: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate,
                }
            }
        })


        return {
            totalInvoices,
            totalInvoicesAmount,
            totalQuantity,
            totalJobs,
        };

    } catch (error) {
        throw error;
    }

}

export default getDashboardDataService