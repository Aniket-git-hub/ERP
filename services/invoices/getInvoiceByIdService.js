import CLIENT from "../../models/clientModel.js";
import INVOICE from "../../models/invoiceModel.js";
import JOB from "../../models/jobModel.js";
import CustomError from "../../utils/createError.js";

async function getInvoiceByIdService(invoiceId) {
    try {
        const invoice = await INVOICE.findByPk(invoiceId,
            {
                include: [
                    {
                        model: CLIENT,
                        attributes: ['id', 'name', 'email', 'phone', 'gst', 'address']
                    },
                    {
                        model: JOB,
                        attributes: ['id', 'drawingNumber', 'quantity', 'rate']
                    }
                ],
                attributes: {
                    exclude: ['ClientId']
                }
            }
        );

        if (!invoice) {
            throw new CustomError('InvoiceError', 'Invoice not found');
        }

        return invoice;
    } catch (error) {
        throw error;
    }
}

export default getInvoiceByIdService;