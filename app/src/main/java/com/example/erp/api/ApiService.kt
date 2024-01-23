package com.example.erp.api

import com.example.erp.api.EndpointInterfaces.AuthEndpoints
import com.example.erp.api.EndpointInterfaces.ClientEndpoints
import com.example.erp.api.EndpointInterfaces.InvoiceEndpoints
import com.example.erp.api.EndpointInterfaces.JobEndpoints
import com.example.erp.api.EndpointInterfaces.MaterialEndpoints
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


interface ApiService:
    AuthEndpoints,
    JobEndpoints,
    ClientEndpoints,
    MaterialEndpoints,
    InvoiceEndpoints
{}

val loggingInterceptor = HttpLoggingInterceptor().apply {
    level = HttpLoggingInterceptor.Level.BODY
}

val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(loggingInterceptor)
    .build()

val apiService: ApiService = Retrofit.Builder()
    .baseUrl("http://10.0.2.2:3000/api/")
    .addConverterFactory(GsonConverterFactory.create())
    .client(okHttpClient)
    .build()
    .create(ApiService::class.java)