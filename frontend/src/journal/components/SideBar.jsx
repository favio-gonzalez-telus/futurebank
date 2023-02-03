import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { SideBarItem } from './';

export const SideBar = ({ drawerWidth = 240 }) => {

    const { email } = useSelector( state => state.auth );

    let dispatch = useDispatch();


    const dashboard = {value: 'DASHBOARD', title: 'dashboard', description: 'keep an eye on everything.'};
    const accounts = {value: 'ACCOUNTS', title: 'accounts', description: 'Manage all user accounts.'};
    const transactions = {value: 'TRANSACTIONS', title: 'transactions', description: 'View and create transactions.'};

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent' // temporary
                open
                sx={{ 
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        { email }
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                <SideBarItem key={'DASHBOARD'} { ...dashboard } />
                
                <SideBarItem key={'ACCOUNTS'} { ...accounts } />
                
                <SideBarItem key={'TRANSACTIONS'} { ...transactions } />
                    
                       
                    
                </List>

            </Drawer>

        </Box>
    )
}
