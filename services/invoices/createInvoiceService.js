import INVOICE from "../../models/invoiceModel.js";
import JOB from "../../models/jobModel.js";

async function createInvoiceService(jobIds, clientId, cGstPercentage = 0, iGstPercentage = 0, sGstPercentage = 0, invoiceNumber, invoiceDate, challanNumber, PONumber, date) {
    try {
        const jobs = await JOB.findAll({
            where: { id: jobIds, ClientId: clientId },
        });

        let totalAmountBeforeTax = calculateTotalAmount(jobs);
        let totalQuantityBilled = calculateTotalQuantity(jobs);

        const cGstAmount = calculateTaxAmount(totalAmountBeforeTax, cGstPercentage);
        const iGstAmount = calculateTaxAmount(totalAmountBeforeTax, iGstPercentage);
        const sGstAmount = calculateTaxAmount(totalAmountBeforeTax, sGstPercentage);

        const totalTaxAmount = cGstAmount + iGstAmount + sGstAmount;

        const totalAmountAfterTax = totalAmountBeforeTax + totalTaxAmount;

        const invoice = await INVOICE.create({
            invoiceNumber,
            invoiceDate,
            totalQuantity: totalQuantityBilled,
            ClientId: clientId,
            cGstPercentage,
            iGstPercentage,
            sGstPercentage,
            totalAmountBeforeTax,
            cGstAmount,
            iGstAmount,
            sGstAmount,
            totalTaxAmount,
            totalAmountAfterTax,
        });

        await invoice.addJobs(jobs);

        return invoice;
    } catch (error) {
        throw error;
    }
}

function calculateTotalQuantity(jobs) {
    return jobs.reduce((total, job) => total + job.quantity, 0);
}

function calculateTotalAmount(jobs) {
    return jobs.reduce((total, job) => total + job.quantity * job.rate, 0);
}

function calculateTaxAmount(amount, percentage) {
    return (amount * percentage) / 100;
}

export default createInvoiceService;