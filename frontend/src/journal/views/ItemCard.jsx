import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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

export const ItemCard = ({ item }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} style={{backgroundColor: item.CURRENCY_ID === 1 ? '#DEFFCA' : '#DDFFF9'}}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {item.ACCOUNT_NAME}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" style={{color: (item.ACCOUNT_MONEY < 0) ? 'red' : 'black'}}>
          BALANCE: {item.ACCOUNT_MONEY?.toFixed(2)}
        </Typography>
        
        <Typography className={classes.pos} color="textSecondary">
          CURRENCY: {item.CURRENCY_NAME}
        </Typography>
      </CardContent>
    </Card>
  );
};
