package com.example.erp.viewModels

import android.util.Log
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.erp.api.apiService
import com.example.erp.model.User
import com.example.erp.model.auth.LoginRequest
import com.example.erp.model.auth.RegisterRequest
import com.example.erp.repository.UserRepository
import kotlinx.coroutines.launch
import org.json.JSONArray
import org.json.JSONObject

class UserViewModel() : ViewModel() {

    val userRepository: UserRepository = UserRepository(apiService = apiService)
    var user: MutableState<User?> = mutableStateOf(null)
        private set

    suspend fun loginUser(
        email: String,
        password: String
    ): Pair<Boolean, MutableList<String>> {
        val response = userRepository.login(LoginRequest(email, password))
        val messages = mutableListOf<String>()
        if(response.isSuccessful) {
            val userResponse = response.body()
            val userRes = userResponse?.user?.let {
                User(
                    it.id,
                    it.firstName,
                    it.lastName,
                    it.email,
                    it.mobileNumber
                )
            }
            user.value = userRes
            val token = userResponse?.token

        } else {
            val errorBody = JSONObject(response.errorBody()?.string())
            val message = errorBody.get("message")
            if (message is JSONArray) {
                for (i in 0 until message.length()) {
                    messages.add(message.getString(i))
                }
            } else if (message is String) {
                messages.add(message)
            }
        }
        return Pair(response.isSuccessful, messages)
    }

    suspend fun registerUser(
        firstName: String,
        lastName:String,
        email: String,
        password: String,
        mobileNumber:String
    ): Pair<Boolean, MutableList<String>> {
        val response = userRepository.register(RegisterRequest(firstName, lastName ,email ,mobileNumber ,password))
        val messages = mutableListOf<String>()
        if(response.isSuccessful) {
            val userResponse = response.body()
            val user = userResponse?.user?.let {
                User(
                    it.id,
                    it.firstName,
                    it.lastName,
                    it.email,
                    it.mobileNumber
                )
            }
            val token = userResponse?.token

        } else {
            val errorBody = JSONObject(response.errorBody()?.string())
            val message = errorBody.get("message")
            if (message is JSONArray) {
                for (i in 0 until message.length()) {
                    messages.add(message.getString(i))
                }
            } else if (message is String) {
                messages.add(message)
            }
        }
        return Pair(response.isSuccessful, messages)
    }
}


