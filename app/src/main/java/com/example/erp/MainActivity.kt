package com.example.erp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable

import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.navigation
import androidx.navigation.compose.rememberNavController
import com.example.erp.ui.auth.RegistrationScreen
import com.example.erp.ui.theme.ERPTheme
import com.example.erp.ui.auth.LoginScreen
import com.example.erp.ui.client.ClientScreen
import com.example.erp.ui.dashboard.DashboardScreen
import com.example.erp.ui.job.ViewJobsScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ERPTheme {
                App()
            }
        }
    }
}

@Composable
fun App() {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = "dashboardScreen") {

        navigation(
            startDestination = "dashboard",
            route="dashboardScreen"
        ) {
            composable("dashboard") {
                DashboardScreen(navController = navController)
            }
        }

        navigation(
            startDestination = "login",
            route="auth"
        ) {
            composable("login") {
                LoginScreen(navController = navController)
            }
            composable("register") {
                RegistrationScreen(navController = navController)
            }
        }

    }
}
