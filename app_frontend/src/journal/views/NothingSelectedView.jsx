import {
  Grid
} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect  } from "react";
import { ItemCard } from './';
import { useDispatch, useSelector } from 'react-redux';
import { startGettingAccounts, setActiveOption, startGettingDashboard } from "../../store/options";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const NothingSelectedView = () => {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const { token, uid } = useSelector( state => state.auth );
  const { itemList, currencies, dashboard } = useSelector( state => state.options );
  useEffect(() => {
    dispatch ( startGettingAccounts(token, uid) );
    dispatch ( startGettingDashboard(token, uid));

  }, []);

  const getCurrencyName = (currency) => {
    return (currencies.filter(c => c.id === currency )[0]?.name);
  };

  const handleCardClick = () => {
    dispatch( setActiveOption('TRANSACTIONS'));
  };

  
  return (
  <>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} key={'TRANSACTION'}>
        <Card className={classes.root} style={{backgroundColor: '#FFE9C9'}} onClick={handleCardClick}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Create a new income/outcome
            </Typography>
          </CardContent>
        </Card>
      </Grid>      
      <Grid item xs={12} sm={6} key={'TRANSFER'}>
        <Card className={classes.root} style={{backgroundColor: '#FFE9C9'}} onClick={handleCardClick}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Make a transfer between your accounts
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {dashboard?.balance?.map(item => (
        <Grid item xs={12} sm={6} key={item.NAME}>
          <Card className={classes.root} style={{backgroundColor: '#F4C9FF'}} onClick={handleCardClick}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {`Your total balance in ${item.NAME} is:`}
              </Typography>
              <Typography className={classes.pos} color="textSecondary" style={{color: (item.TOTAL_MONEY < 0) ? 'red' : 'black'}}>
                {`${item.TOTAL_MONEY?.toFixed(2)} ${item.NAME}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
    ))}
      {itemList.map(item => (
      <Grid item xs={12} sm={6} key={item.ACCOUNT_NAME} onClick={handleCardClick}>
        <ItemCard item={{...item, CURRENCY_NAME: getCurrencyName(item.CURRENCY_ID)}} />
      </Grid>
    ))}
  </Grid>
  </>
    
  )
}
