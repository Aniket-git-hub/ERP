package com.example.erp.repository

import com.example.erp.api.ApiService
import com.example.erp.model.auth.LoginRequest
import com.example.erp.model.auth.RegisterRequest
import com.example.erp.model.User
import com.example.erp.model.auth.AuthResponse
import retrofit2.Response

class UserRepository(private val apiService: ApiService) {
    suspend fun login(loginRequest: LoginRequest): Response<AuthResponse>{
        return apiService.login(loginRequest)
    }
    suspend fun register(registerRequest: RegisterRequest): Response<AuthResponse>{
        return apiService.register(registerRequest)
    }
}