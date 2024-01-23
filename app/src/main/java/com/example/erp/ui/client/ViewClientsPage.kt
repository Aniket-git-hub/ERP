package com.example.erp.ui.client

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.erp.model.job.Drawing
import com.example.erp.viewModels.JobViewModel


@OptIn(ExperimentalFoundationApi::class)
@Composable
fun ViewClientsScreen() {
    val jobViewModel: JobViewModel = viewModel()

    var items by remember { mutableStateOf<List<Drawing>?>(null) }

    LaunchedEffect(items) {
        if (items == null) {
            jobViewModel.getJobs()
        }
        items = jobViewModel.items
    }

    Scaffold { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.White)
                .padding(paddingValues)
                .padding(10.dp)
        ) {
            item {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                ) {
                    OutlinedTextField(
                        value = "",
                        onValueChange = {},
                        label = { Text("Search ") },
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(8.dp)
                            .weight(8f)
                    )

                    IconButton(
                        onClick = {},
                        modifier = Modifier
                            .padding(8.dp)
                            .weight(2f)
                    ) {
                        Icon(
                            imageVector = Icons.Default.Search,
                            contentDescription = null
                        )
                    }
                }
            }

            stickyHeader {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color.DarkGray)
                        .padding(top = 10.dp, bottom = 10.dp)
                ) {
                    Text(
                        text = "#",
                        textAlign = TextAlign.Center,
                        fontSize = 18.sp,
                        color = Color.White,
                        modifier = Modifier
                            .weight(1f)
                    )
                    Text(
                        text = "Drawing Number",
                        textAlign = TextAlign.Center,
                        fontSize = 18.sp,
                        color = Color.White,
                        modifier = Modifier
                            .weight(3f)
                    )
                    Text(
                        text = "Qty",
                        textAlign = TextAlign.Center,
                        fontSize = 18.sp,
                        color = Color.White,
                        modifier = Modifier
                            .weight(1f)
                    )
                    Text(
                        text = "Rate",
                        textAlign = TextAlign.Center,
                        fontSize = 18.sp,
                        color = Color.White,
                        modifier = Modifier
                            .weight(1f)
                    )
                    Text(
                        text = "Total",
                        textAlign = TextAlign.Center,
                        fontSize = 18.sp,
                        color = Color.White,
                        modifier = Modifier
                            .weight(2f)
                    )
                }
            }

            items?.let { drawingList ->
                items(drawingList) { drawing ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(if (drawingList.indexOf(drawing) % 2 == 0) Color.LightGray else Color.White)
                            .padding(top = 10.dp, bottom = 10.dp)
                    ) {
                        Text(
                            text = (drawingList.indexOf(drawing) + 1).toString(),
                            textAlign = TextAlign.Center,
                            fontSize = 16.sp,
                            modifier = Modifier
                                .weight(1f)
                        )
                        Text(
                            text = drawing.drawingNumber,
                            textAlign = TextAlign.Center,
                            fontSize = 16.sp,
                            modifier = Modifier.weight(3f)
                        )
                        Text(
                            text = drawing.qty.toString(),
                            textAlign = TextAlign.Center,
                            fontSize = 16.sp,
                            modifier = Modifier.weight(1f)
                        )
                        Text(
                            text = drawing.rate.toString(),
                            textAlign = TextAlign.Center,
                            fontSize = 16.sp,
                            modifier = Modifier.weight(1f)
                        )
                        Text(
                            text = drawing.total.toString(),
                            textAlign = TextAlign.Center,
                            fontSize = 16.sp,
                            modifier = Modifier.weight(2f)
                        )
                    }
                }
            }
        }
    }
}
