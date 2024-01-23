package com.example.erp.model.client

data class UpdateClientBody(
    val id: Int? = null,
    val name: String? = null,
    val email: String? = null,
    val phone: Number? = null,
    val gst: String? = null,
    val address: String? = null
)
