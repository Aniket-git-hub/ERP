package com.example.erp.api.EndpointInterfaces

import com.example.erp.model.auth.AuthResponse
import com.example.erp.model.auth.LoginRequest
import com.example.erp.model.auth.RegisterRequest
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthEndpoints {
    @POST("auth/login")
    suspend fun login(@Body loginRequest: LoginRequest): Response<AuthResponse>

    @POST("auth/register")
    suspend fun register(@Body registerRequest: RegisterRequest): Response<AuthResponse>
}