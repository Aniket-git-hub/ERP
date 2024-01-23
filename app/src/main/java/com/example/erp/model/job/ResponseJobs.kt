package com.example.erp.model.job

data class ResponseJobs(
    val totalItems: Int,
    val currentPage: Int,
    val totalPages: Int,
    val hasNextPage: Boolean,
    val limit: Int,
    val countInCurrentPage: Int,
    val items: List<Drawing>
)
