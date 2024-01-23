package com.example.erp.ui.dashboard

import android.annotation.SuppressLint
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.Badge
import androidx.compose.material3.BadgedBox
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.rememberTopAppBarState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.NavHost
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.erp.ui.client.AddClientsScreen
import com.example.erp.ui.client.ClientScreen
import com.example.erp.ui.client.ViewClientsScreen
import com.example.erp.ui.common.AppBar
import com.example.erp.ui.job.AddJobsScreen
import com.example.erp.ui.job.JobScreen
import com.example.erp.ui.job.ViewJobsScreen
import com.example.erp.ui.setting.SettingScreen

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DashboardScreen(navController: NavController) {
    val dashboardNavController = rememberNavController()
    val items = listOf(
        BottomNavigationItem(
            title = "Home",
            selectedIcon = Icons.Filled.Home,
            unselectedIcon = Icons.Filled.Home,
            hasNews = false,
            route = "home",
        ),
        BottomNavigationItem(
            title = "Jobs",
            selectedIcon = Icons.Filled.Build,
            unselectedIcon = Icons.Filled.Build,
            hasNews = false,
            badgeCount = 1,
            route = "job"
        ),
        BottomNavigationItem(
            title = "Clients",
            selectedIcon = Icons.Filled.Person,
            unselectedIcon = Icons.Filled.Person,
            hasNews = false,
            route = "client"
        ),
        BottomNavigationItem(
            title = "Settings",
            selectedIcon = Icons.Filled.Settings,
            unselectedIcon = Icons.Filled.Settings,
            hasNews = false,
            route = "setting"
        )
    )
    var selectedItemIndex by remember {
        mutableStateOf(0)
    }
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior(rememberTopAppBarState())
    var currentScreenTitle by remember {
        mutableStateOf(
            items[selectedItemIndex].title
        )
    }
    var showBackButton by remember {
        mutableStateOf(false)
    }
    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = { AppBar(currentScreenTitle, showBackButton, dashboardNavController, scrollBehavior) },
        bottomBar = {
            BottomNavigationBar(
                items = items,
                selectedItemIndex = selectedItemIndex,
                onItemSelected = { index ->
                    selectedItemIndex = index
                    dashboardNavController.navigate(items[index].route)
                }
            )
        }
    ) { paddingValue ->
        Box (
            modifier = Modifier
                .padding(paddingValue)
                .fillMaxSize()
        ) {
            NavHost(navController = dashboardNavController, startDestination = "home") {
                composable("home") {
                    OverviewScreen()
                    currentScreenTitle = "Overview"
                    showBackButton = false
                }
                composable("client") {
                    ClientScreen(dashboardNavController)
                    currentScreenTitle = "Clients"
                    showBackButton = false

                }
                composable("view-clients"){
                    ViewClientsScreen()
                    currentScreenTitle = "View Clients"
                    showBackButton = true
                }
                composable("add-clients"){
                    AddClientsScreen()
                    currentScreenTitle = "Add Clients"
                    showBackButton = true
                }

                composable("job") {
                    JobScreen(dashboardNavController)
                    currentScreenTitle = "Jobs"
                    showBackButton = false

                }
                composable("view-jobs") {
                    ViewJobsScreen()
                    currentScreenTitle = "View Jobs"
                    showBackButton = true
                }
                composable("add-jobs") {
                    AddJobsScreen()
                    currentScreenTitle = "Add Jobs"
                    showBackButton = true

                }

                composable("setting") {
                    SettingScreen()
                    currentScreenTitle = "Settings"
                    showBackButton = false

                }

            }
        }
    }
}

