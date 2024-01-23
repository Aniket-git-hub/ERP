package com.example.erp.ui.job


import android.util.Log
import android.widget.Toast
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.modifier.modifierLocalConsumer
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.erp.model.job.Drawing
import com.example.erp.viewModels.JobViewModel
import java.time.LocalDate
import com.maxkeppeker.sheets.core.models.base.rememberUseCaseState
import com.maxkeppeler.sheets.calendar.CalendarDialog
import com.maxkeppeler.sheets.calendar.models.CalendarConfig
import com.maxkeppeler.sheets.calendar.models.CalendarSelection
import com.maxkeppeler.sheets.calendar.models.CalendarStyle
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.util.Locale


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddJobsScreen() {
    var quantity by remember { mutableStateOf("") }
    var rate by remember { mutableStateOf("") }

    var selectedDate by remember { mutableStateOf(LocalDate.now()) }
    val calendarState = rememberUseCaseState()

    val jobViewModel:JobViewModel = viewModel()


    Column (
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .padding(10.dp)
    ) {

        CalendarDialog(
            state = calendarState,
            selection = CalendarSelection.Date{ date ->
                selectedDate = date
            },
            config = CalendarConfig(
                Locale.getDefault()
            )
        )

        OutlinedTextField(
            value = "",
            onValueChange = {},
            label = { Text("Drawing Number") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 16.dp)
        )

        Row (
            modifier = Modifier
                .padding(top = 8.dp)
        ) {
            OutlinedTextField(
                value = quantity,
                onValueChange = { quantity = it },
                label = { Text("Quantity") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                modifier = Modifier
                    .padding(end = 5.dp)
                    .weight(1f)
            )
            OutlinedTextField(
                value = rate,
                onValueChange = { rate = it },
                label = { Text("Rate") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                modifier = Modifier
                    .padding(start = 5.dp)
                    .weight(1f)
            )
        }

        OutlinedTextField(
            value = "",
            onValueChange = {},
            label = { Text("Client") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 8.dp)
        )

        Row (
            modifier = Modifier
                .padding(top = 8.dp)
        ) {
            OutlinedTextField(
                value = "",
                onValueChange = {},
                label = { Text("Date") },
                modifier = Modifier
                    .padding(end = 5.dp)
                    .weight(1f)
            )
            OutlinedTextField(
                value = "",
                onValueChange = {},
                label = { Text("Material") },
                modifier = Modifier
                    .padding(start = 5.dp)
                    .weight(1f)
            )
        }

        OutlinedTextField(
            value = "",
            onValueChange = {},
            label = { Text("Size") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 8.dp)
        )

        OutlinedTextField(
            value = "",
            onValueChange = {},
            label = { Text("Description") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 8.dp)
        )

        Button(
            onClick = {  },
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 16.dp)
        ) {
            Text("Save", fontSize = 20.sp)
        }
    }
}

