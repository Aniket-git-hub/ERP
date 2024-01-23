package com.example.erp.api.EndpointInterfaces

import com.example.erp.model.invoice.AddInvoiceBody
import com.example.erp.model.invoice.Invoice
import com.example.erp.model.invoice.UpdateInvoiceBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

interface InvoiceEndpoints {
    @GET("invoice/{invoiceId")
    suspend fun getInvoiceById( @Path("invoiceId") invoiceId: String) : Response<Invoice>

    @POST("invoice/")
    suspend fun addInvoice(@Body addInvoiceBody: AddInvoiceBody): Response<Invoice>

    @PUT("invoice/")
    suspend fun updateInvoice(@Body updateInvoiceBody: UpdateInvoiceBody): Response<Invoice>

    @DELETE("invoice/{invoiceId}")
    suspend fun deleteInvoice( @Path("invoiceId") invoiceId: String)
}