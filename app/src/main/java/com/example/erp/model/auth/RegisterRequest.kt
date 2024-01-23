package com.example.erp.model.auth

data class RegisterRequest(
    val firstName:String,
    val lastName:String,
    val email:String,
    val mobileNumber:String,
    val password:String,
)
