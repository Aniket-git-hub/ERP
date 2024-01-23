package com.example.erp.model.invoice

import java.util.Date

data class AddInvoiceBody(
    val jobIds: List<Int>,
    val clientId: Int,
    val cGst: Int,
    val sGst: Int,
    val invoiceNumber: Int,
    val invoiceDate: Date,
)
