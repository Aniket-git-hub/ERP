import getInvoiceByIdService from "../../services/invoices/getInvoiceByIdService.js";
import convertAmountToWords from "../../utils/amountInWords.js";
import generatePDF from "../../utils/generatePDF.js";
import generateInvoiceTemplate from "../../utils/pdfTemplates/invoideTemplate.js";

async function generateInvoicePdfController(req, res, next) {
    const { invoiceId } = req.params;
    const { userId } = req.user
    try {
        const { Client, invoiceNumber, invoiceDate, notes, totalTaxAmount, totalAmountAfterTax, totalAmountBeforeTax, totalQuantity, cGstPercentage, iGstPercentage, sGstPercentage, cGstAmount, iGstAmount, sGstAmount, Jobs } = await getInvoiceByIdService(userId, invoiceId);
        // Jobs.forEach(j => console.log(j.drawingNumber))
        const pdfBuffer = await generatePDF(generateInvoiceTemplate(
            Client,
            invoiceDate,
            invoiceNumber,
            'MH14KL5459',
            totalQuantity,
            totalAmountAfterTax,
            totalAmountBeforeTax,
            sGstPercentage,
            cGstPercentage,
            iGstPercentage,
            cGstAmount,
            sGstAmount,
            iGstAmount,
            totalTaxAmount,
            convertAmountToWords(totalAmountAfterTax) + " Only",
            notes,
            Jobs
        ))
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${Client.name}-invoice.pdf`);
        res.send(pdfBuffer);
    } catch (error) {
        next(error)
    }
}

export default generateInvoicePdfController;