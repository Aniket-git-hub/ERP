package com.example.erp.model.invoice

import java.util.Date

data class UpdateInvoiceBody(
    val invoiceNumber: Int,
    val invoiceDate: String,
    val totalQuantity: Int,
    val cGgsPercentage: Float,
    val iGstPercentage: Float,
    val sGstPercentage: Float,
    val totalAmountBeforeTax: Float,
    val cGstAmount: Float,
    val iGstAmount: Float,
    val sGstAmount: Float,
    val totalTaxAmount: Float,
    val totalAmountAfterTax: Float,
    val notes: String,
    val clientId: Int,
)
