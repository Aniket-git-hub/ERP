import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const INVOICE = sequelize.define(
    'Invoice',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        invoiceNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        invoiceDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        totalQuantity: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        cGstPercentage: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        iGstPercentage: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        sGstPercentage: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        totalAmountBeforeTax: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        cGstAmount: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        iGstAmount: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        sGstAmount: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        totalTaxAmount: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        totalAmountAfterTax: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        invoiceType: {
            type: DataTypes.ENUM('taxed', 'simple'),
            allowNull: false,
            defaultValue: 'taxed'
        },
        paymentReceived: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        hooks: {
            beforeValidate: async (invoice) => {
                if (!invoice.invoiceNumber) {
                    const latestInvoice = await INVOICE.findOne({
                        order: [['createdAt', 'DESC']],
                        where: {
                            invoiceType: invoice.invoiceType
                        }
                    });

                    const lastInvoiceNumber = latestInvoice
                        ? latestInvoice.invoiceNumber
                        : 0;
                    invoice.invoiceNumber = lastInvoiceNumber + 1;
                }

                if (invoice.invoiceType === 'taxed') {
                    const totalAmountBeforeTax =
                        +invoice.totalAmountBeforeTax || 0;
                    const cGstPercentage = +invoice.cGstPercentage || 0;
                    const iGstPercentage = +invoice.iGstPercentage || 0;
                    const sGstPercentage = +invoice.sGstPercentage || 0;

                    invoice.cGstAmount =
                        (totalAmountBeforeTax * cGstPercentage) / 100;
                    invoice.iGstAmount =
                        (totalAmountBeforeTax * iGstPercentage) / 100;
                    invoice.sGstAmount =
                        (totalAmountBeforeTax * sGstPercentage) / 100;

                    invoice.totalTaxAmount =
                        invoice.cGstAmount +
                        invoice.iGstAmount +
                        invoice.sGstAmount;

                    invoice.totalAmountAfterTax =
                        totalAmountBeforeTax + invoice.totalTaxAmount;
                }
            }
        }
    }
);

export default INVOICE;
