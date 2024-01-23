package com.example.erp.repository

import com.example.erp.api.ApiService
import com.example.erp.model.auth.AuthResponse
import com.example.erp.model.auth.LoginRequest
import com.example.erp.model.auth.RegisterRequest
import com.example.erp.model.job.Drawing
import com.example.erp.model.job.ResponseJobs
import retrofit2.Response

class JobRepository (private val apiService: ApiService){
    suspend fun getFilteredJobs(limit:Int, page:Int): Response<ResponseJobs> {
        return apiService.getFilteredJob(
            limit = limit,
            page = page,
        )
    }
}
