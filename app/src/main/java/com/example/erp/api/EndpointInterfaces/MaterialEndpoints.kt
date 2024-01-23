package com.example.erp.api.EndpointInterfaces

import com.example.erp.model.material.AddMaterialBody
import com.example.erp.model.material.Material
import com.example.erp.model.material.UpdateMaterialBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface MaterialEndpoints {
    //    Material Requests
    @GET("material/{materialId")
    suspend fun getMaterialById( @Path("materialId") materialId: String) : Response<Material>

    @POST("material/")
    suspend fun addMaterial(@Body addMaterialBody: AddMaterialBody): Response<Material>

    @PUT("material/")
    suspend fun updateMaterial(@Body updateMaterialBody: UpdateMaterialBody): Response<Material>

    @DELETE("material/{materialId}")
    suspend fun deleteMaterial( @Path("materialId") materialId: String)
}