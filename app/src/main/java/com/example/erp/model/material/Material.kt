package com.example.erp.model.material

import java.util.Date

data class Material(
    val id: Int,
    val name: String,
    val hardness: String,
    val density: Float,
    val createdAt: Date,
    val updatedAt: Date
)
