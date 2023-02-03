import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';
import { setActiveOption } from '../../store/options';


export const SideBarItem = ({ value, title, description }) => {

   // const dispatch = useDispatch();

    const { displayName } = useSelector( state => state.auth );

    let dispatch = useDispatch();
    
    const onClickOption = () => {
        console.log(value);
        dispatch ( setActiveOption(value)); 
    }

  return (
    <ListItem disablePadding>
        <ListItemButton onClick={ onClickOption }>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ title } />
                <ListItemText secondary={ description } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}