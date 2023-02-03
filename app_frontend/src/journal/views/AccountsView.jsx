import React, { useState, useEffect  } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  InputLabel,
  MenuItem,
  IconButton,
  Grid
} from "@material-ui/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { startGettingAccounts, startCreatingAcount, startUpdatingAcount, startDeletingAcount } from "../../store/options";
import { CommentBank } from "@mui/icons-material";

export const AccountsView = () => {
  const dispatch = useDispatch();
  const { token, uid } = useSelector( state => state.auth );
  const { itemList, currencies } = useSelector( state => state.options );

  const [accounts, setAccounts] = useState([
    { id: 1, email: "example1@gmail.com", balance: 1000, name: "John Doe", number: 123456 },
    { id: 2, email: "example2@gmail.com", balance: 2000, name: "Jane Doe", number: 654321 }]);


  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [formData, setFormData] = useState({
    ID: "",
    ACCOUNT_MONEY: 0,
    ACCOUNT_NAME: "",
    ACCOUNT_NUMBER: "",
    CURRENCY_ID: ""
  });

  useEffect(() => {
    dispatch ( startGettingAccounts(token, uid) );

  }, []);

  useEffect(() => {
    setAccounts(itemList);

  }, [itemList]);

  const handleClickOpen = (account) => {
    if (account) {
      let aux_account = {... account}
      aux_account.ACCOUNT_MONEY = account.ACCOUNT_MONEY?.toFixed(2);
      setSelectedAccount(aux_account);
      setFormData(aux_account);
    } else {
      setSelectedAccount({ACCOUNT_MONEY: 0});
      setFormData({ACCOUNT_MONEY: 0});
    }
    setOpen(true);
  };

  const handleClickDelete = (account) => {
    dispatch(startDeletingAcount(token, uid, account.ID));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(startCreatingAcount(token, formData.ACCOUNT_NAME, uid, formData.CURRENCY_ID));
    handleClose();
  };

  const handleUpdate = event => {
    event.preventDefault();
    console.log('UPDATING');
    dispatch(startUpdatingAcount(token, uid, formData.ID, formData.ACCOUNT_NAME));
    setOpen(false);
  }

  const getCurrencyName = (currency) => {
    return (currencies.filter(c => c.id === currency )[0]?.name);
  };

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={2} key={'transaction'}>
          <Button variant="contained" color = "primary"  fullWidth = {true}  onClick={handleClickOpen}>
            Add Account
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Account</DialogTitle>
        <DialogContent>
        {
            selectedAccount.ACCOUNT_NAME && 
          <TextField
            margin="dense"
            label="Balance"
            type="number"
            name="ACCOUNT_MONEY"
            disabled={true}
            fullWidth
            value={formData.ACCOUNT_MONEY}
            onChange={handleChange}
          />
        }
          <TextField
            margin="dense"
            label="Account Name"
            type="text"
            name="ACCOUNT_NAME"
            fullWidth
            value={formData.ACCOUNT_NAME}
            onChange={handleChange}
          />

          <InputLabel id="currency_label">Currency</InputLabel>
          {
            !selectedAccount.ACCOUNT_NAME && 
          <Select
            margin="dense"
            label="Currency"
            labelId="currency_label"
            name="CURRENCY_ID"
            fullWidth
            value={formData.CURRENCY_ID}
            onChange={handleChange}
          >
            {currencies.map((item) => (
              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
          }
          {
            selectedAccount.ACCOUNT_NAME && 
          <Select
            margin="dense"
            label="Currency"
            labelId="currency_label"
            name="CURRENCY_ID"
            disabled = {true}
            fullWidth
            value={formData.CURRENCY_ID}
            onChange={handleChange}
          >
            {currencies.map((item) => (
              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
          }
          {
            selectedAccount.ACCOUNT_NAME && 
          <TextField
            margin="dense"
            label="Account number"
            type="text"
            name="ACCOUNT_NUMBER"
            disabled={true}
            fullWidth
            value={formData.ACCOUNT_NUMBER}
            onChange={handleChange}
          />
            
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          {!selectedAccount.ACCOUNT_NAME && 
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>}
          {selectedAccount.ACCOUNT_NAME && 
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>}
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style = {{'backgroundColor': '#DDFFF9'}}>
              <TableCell>ID</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Account Name</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map(account => (
              <TableRow key={account.ID}>
                <TableCell>{account.ID}</TableCell>
                <TableCell>{account.ACCOUNT_MONEY?.toFixed(2)}</TableCell>
                <TableCell>{account.ACCOUNT_NAME}</TableCell>
                <TableCell>{account.ACCOUNT_NUMBER}</TableCell>
                <TableCell>{getCurrencyName(account.CURRENCY_ID)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleClickOpen(account)}>
                    <EditIcon style = {{'color': '#8CD5FF'}}/>
                  </IconButton>
                <IconButton onClick={() => handleClickDelete(account)}>
                    <DeleteIcon style = {{'color': '#C63E3E'}} />
                  </IconButton>
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
</>
  )
}
