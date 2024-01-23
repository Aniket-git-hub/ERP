package com.example.erp.api.EndpointInterfaces

import com.example.erp.model.client.AddClientBody
import com.example.erp.model.client.Client
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query

interface ClientEndpoints {
    @GET("client/{clientId}")
    suspend fun getClientById(
        @Path("clientId") clientId: Int,
    )

    @GET("client/")
    suspend fun getFilteredClient(
        @Query("name") name: String? = null,
        @Query("gst") gst: String? = null,
        @Query("email") email: String? = null,
        @Query("phone") phone: String? = null
    )

    @POST("client/")
    suspend fun addClient(
        @Body addClientBody: AddClientBody
    ): Response<Client>

    @PUT("client/")
    suspend fun updateClient(
        @Body updateClientBody: AddClientBody
    ): Response<Client>

    @DELETE("client/{clientId}")
    suspend fun deleteClient(
        @Path("clientId") clientId: Int,
    )


}