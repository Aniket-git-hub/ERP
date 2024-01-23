package com.example.erp.viewModels

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.example.erp.api.apiService
import com.example.erp.model.job.Drawing
import com.example.erp.repository.JobRepository
import kotlinx.coroutines.Job

class JobViewModel: ViewModel() {
    val jobs by mutableStateOf(null)
    private val jobRepository: JobRepository = JobRepository(apiService = apiService)
    var items by mutableStateOf<List<Drawing>?>(null)
    suspend fun getJobs(limit:Int = 20, page:Int = 1 ){
        val response = jobRepository.getFilteredJobs(50, 1)
        if(response.isSuccessful) {
            val res = response.body()
            items = res?.items
            Log.d("Response From Server", "getJobs: $res")
        }
    }
}