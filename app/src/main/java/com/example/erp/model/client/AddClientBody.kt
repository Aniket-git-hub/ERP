package com.example.erp.model.client

data class AddClientBody(
    val name: String,
    val email: String,
    val phone: Number,
    val gst: String,
    val address: String,
)
