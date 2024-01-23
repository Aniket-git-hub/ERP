package com.example.erp.api.EndpointInterfaces

import com.example.erp.model.job.Drawing
import com.example.erp.model.job.ResponseJobs
import com.example.erp.model.job.updateJobBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query

interface JobEndpoints {
    @POST("job/")
    suspend fun addJob(@Body drawing: Drawing): Response<Drawing>

    @DELETE("job/{jobId}")
    suspend fun deleteJob(@Path("jobId") jobId: Int): Response<Drawing>

    @GET("job/{jobId}")
    suspend fun getJobById(@Path("jobId") jobId:Int): Response<Drawing>

    @GET("job")
    suspend fun getFilteredJob(
        @Query("ClientId") clientId: Int? = null,
        @Query("drawingNumber") drawingNumber: String? = null,
        @Query("MaterialId") materialId: String? = null,
        @Query("page") page: Int? = null,
        @Query("limit") limit: Int? = null,
        @Query("pdf") pdf: Boolean? = null,
        @Query("csv") csv: Boolean? = null
    ): Response<ResponseJobs>

    @PUT("job/{jobId}")
    suspend fun updateJob(
        @Path("jobId") jobId: Int,
        @Body updateJobBody: updateJobBody
    ): Response<Drawing>
}