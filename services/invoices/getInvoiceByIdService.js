import CLIENT from '../../models/work/clientModel.js';
import INVOICE from '../../models/work/invoiceModel.js';
import JOB from '../../models/work/jobModel.js';
import CustomError from '../../utils/createError.js';

async function getInvoiceByIdService(userId, invoiceId) {
    try {
        const invoice = await INVOICE.findByPk(invoiceId, {
            include: [
                {
                    model: CLIENT,
                    attributes: [
                        'id',
                        'name',
                        'email',
                        'phone',
                        'gst',
                        'address'
                    ]
                },
                {
                    model: JOB,
                    attributes: ['id', 'drawingNumber', 'quantity', 'rate']
                }
            ],
            attributes: {
                exclude: ['ClientId']
            },
            where: {
                UserId: userId
            }
        });

        if (!invoice) {
            throw new CustomError('InvoiceError', 'Invoice not found');
        }

        return invoice;
    } catch (error) {
        throw error;
    }
}

export default getInvoiceByIdService;
