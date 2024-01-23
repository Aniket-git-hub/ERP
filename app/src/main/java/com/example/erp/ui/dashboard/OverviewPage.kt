package com.example.erp.ui.dashboard

import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.erp.viewModels.UserViewModel

@Preview
@Composable
fun OverviewScreen(){
    val userViewModel: UserViewModel = viewModel()
    val user = userViewModel.user.value
    Log.d("Check user", "OverviewScreen: $user")
    Column (
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier
            .fillMaxSize()
            .padding(top = 16.dp)
            .background(Color.White)
    ) {

        Text(text = "Namaste, ${user}", fontSize = 30.sp)
    }
}
