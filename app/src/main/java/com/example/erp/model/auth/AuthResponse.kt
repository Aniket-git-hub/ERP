package com.example.erp.model.auth

import com.example.erp.model.User

data class AuthResponse(
    val user: User,
    val token: String,
)
