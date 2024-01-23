// LoginPage.kt
package com.example.erp.ui.auth

import android.util.Log
import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.example.erp.api.apiService
import com.example.erp.model.User
import com.example.erp.model.auth.LoginRequest
import com.example.erp.repository.UserRepository
import com.example.erp.viewModels.UserViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject

@Composable
fun LoginScreen(navController: NavController) {
    val context = LocalContext.current
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    val userViewModel: UserViewModel= viewModel()

    Column(
        modifier = Modifier
            .background(Color.White)
            .fillMaxSize()
            .padding(15.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(text = "LETSBUG ERP", fontSize = 40.sp, fontWeight = FontWeight.ExtraBold)
        Text(text = "Admin Login", fontSize = 30.sp, fontWeight = FontWeight.Bold)
        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email") },
            modifier = Modifier
                .fillMaxWidth()
        )
        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            modifier = Modifier
                .fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(15.dp))

        Button(
            onClick = {
                CoroutineScope(Dispatchers.IO).launch {
                    val (success, messages) = userViewModel.loginUser(email, password)
                    withContext(Dispatchers.Main) {
                        if (success) {
                            navController.navigate("dashboard") {
                                popUpTo("auth") {
                                    inclusive = true
                                }
                                launchSingleTop = true
                            }
                        } else {
                            val errorMessage = messages.joinToString("\n")
                            Toast.makeText(context, errorMessage, Toast.LENGTH_SHORT).show()
                        }
                    }
                }
            },
            modifier = Modifier
                .fillMaxWidth(),

            ) {
            Text( text="Login", fontSize = 25.sp)
        }
        TextButton(onClick = { navController.navigate("register") }) {
            Text("Go to Register")
        }
    }
}

@Preview
@Composable
fun MyLoginPreview() {
    val navController = rememberNavController()
    LoginScreen(navController = navController)
}