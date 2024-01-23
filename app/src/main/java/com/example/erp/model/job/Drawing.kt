package com.example.erp.model.job

import com.example.erp.model.client.Client
import com.example.erp.model.material.Material
import java.util.Date

data class Drawing(
    val id: Int,
    val drawingNumber: String,
    val description: String,
    val date: Date,
    val imageUrl: String,
    val qty: Int,
    val rate: Int,
    val size: String,
    val Client: Client,
    val Material: Material,
    val total: Int,
    val InvoiceId: Int,
    val createdAt: Date,
    val updatedAt: Date,
)
