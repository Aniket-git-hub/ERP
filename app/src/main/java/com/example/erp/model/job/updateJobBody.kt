package com.example.erp.model.job

data class updateJobBody(
    val drawingNumber: String?,
    val ClientId: Int?,
    val Material: String?,
    val imageURL: String?,
    val quantity: Int?,
    val rate: Int?,
    val InvoiceId: Int?
)
