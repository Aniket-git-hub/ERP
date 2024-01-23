package com.example.erp.ui.dashboard

import androidx.compose.material3.Badge
import androidx.compose.material3.BadgedBox
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.vector.ImageVector

data class BottomNavigationItem(
    val title: String,
    val selectedIcon: ImageVector,
    val unselectedIcon: ImageVector,
    val hasNews: Boolean,
    val badgeCount: Int? = null,
    val route: String
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BottomNavigationBar(
    items: List<BottomNavigationItem>,
    selectedItemIndex: Int,
    onItemSelected: (Int) -> Unit
) {
    NavigationBar {
        items.forEachIndexed { index, bottomNavigationItem ->
            NavigationBarItem(
                selected = selectedItemIndex == index,
                onClick = {
                    onItemSelected(index)
                },
                label = {
                    Text(text = bottomNavigationItem.title)
                },
                icon = {
                    BadgedBox(
                        badge = {
                            if (bottomNavigationItem.badgeCount != null) {
                                Badge {
                                    Text(text = bottomNavigationItem.badgeCount.toString())
                                }
                            } else if (bottomNavigationItem.hasNews) {
                                Badge()
                            }
                        }
                    ) {
                        Icon(
                            imageVector = if (index == selectedItemIndex) {
                                bottomNavigationItem.selectedIcon
                            } else bottomNavigationItem.unselectedIcon,
                            contentDescription = ""
                        )
                    }
                }
            )
        }
    }
}
