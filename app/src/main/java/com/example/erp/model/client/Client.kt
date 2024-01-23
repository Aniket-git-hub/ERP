package com.example.erp.model.client

import java.util.Date

data class Client(
    val id: Int,
    val name: String,
    val email: String,
    val phone: Number,
    val gst: String,
    val address: String,
    val createdAt: Date,
    val updatedAt: Date
)
