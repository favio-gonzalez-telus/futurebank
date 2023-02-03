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

import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useDispatch, useSelector } from 'react-redux';
import { startGettingAccounts,
    startGettingCategories,
    startGettingTransactions,
    startCreatingTransaction,
    startCreatingTranfer,
    startDeletingTransaction} from "../../store/options";

export const TransactionsView = () => {
    const dispatch = useDispatch();
    const { token, uid } = useSelector( state => state.auth );
    const { itemList, currencies, categoriesList, transactions, transactionTypes } = useSelector( state => state.options );

    const [transactionList, setTransactions] = useState([]);
    
    
      const [open, setOpen] = useState(false);
      const [isTransfer, setIsTransfer] = useState(false);
      const [formData, setFormData] = useState({
        ID: "",
        ACCOUNT_ID: "",
        RECEIVER_ID: "",
        ADD_DATE: "",
        CATEGORY_ID: "",
        CURRENCY_ID: "",
        TRANSACTION_AMOUNT: "",
        TRANSACTION_TYPE: ""
      });

      const [filterForm, setFilterForm] = useState({
        account_id: "",
        category_id: "",
        date: ""
      });

      const handleChangeFilter = event => {
        console.log(event.target);
        setFilterForm({ ...filterForm, [event.target.name]: event.target.value });
      };

    useEffect(() => {
        dispatch ( startGettingCategories(token, uid) );
        dispatch (startGettingTransactions(token, uid, {}));
        dispatch ( startGettingAccounts(token, uid) );
        
    
      }, []);

      useEffect(() => {
        setTransactions(transactions);
      }, [transactions]);

      

      const getCurrencyName = (currency) => {
        return (currencies.filter(c => c.id === currency )[0]?.name);
      };

      const getCategoryName = (category) => {
        return (categoriesList.filter(c => c.ID === category )[0]?.VALUE);
      };

      const getAccountName = (account) => {
        return (itemList.filter(c => c.ID === account )[0]?.ACCOUNT_NAME);
      };

      const getAccountCurrency = (account) => {
        const currencyName =  getCurrencyName(itemList.filter(c => c.ID === account )[0]?.CURRENCY_ID);
        if (currencyName) {
            return `(${currencyName})`;
        }
        else {return '';}

      };

      const getTransferCat = () => {
        return (categoriesList.filter(c => c.VALUE === 'Transfer' )[0]?.ID);
      };

      const handleClickOpen = (transfer,event) => {
        setFormData(
            {
                ID: "",
                ACCOUNT_ID: "",
                RECEIVER_ID: "",
                ADD_DATE: "",
                CATEGORY_ID: "",
                CURRENCY_ID: "",
                TRANSACTION_AMOUNT: 0,
                TRANSACTION_TYPE: ""
              }
        );

        if (transfer) {
            setFormData({ ...formData, ['CATEGORY_ID']: getTransferCat() });
        }
        
        event.preventDefault();
        setIsTransfer(transfer);
        setOpen(true);
      };

      const handleClose = () => {
        setFormData(
            {
                ID: "",
                ACCOUNT_ID: "",
                RECEIVER_ID: "",
                ADD_DATE: "",
                CATEGORY_ID: "",
                CURRENCY_ID: "",
                TRANSACTION_AMOUNT: 0,
                TRANSACTION_TYPE: ""
              }
        );
        setOpen(false);
      };

      const handleChange = event => {
        console.log(event.target);
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };

      const handleFilter = event => {
        event.preventDefault();
        console.log(filterForm);
        dispatch (startGettingTransactions(token, uid, filterForm));

      };

      const handleclear = event => {
        event.preventDefault();
        setFilterForm({
            account_id: "",
            category_id: "",
            date: ""
        });

        dispatch (startGettingTransactions(token, uid, {}));
      };

      const handleClickDelete = (id) => {
        dispatch(startDeletingTransaction(token, uid, id));
      };

      const handleSubmit = event => {
        event.preventDefault();
        // dispatch(startCreatingAcount(token, formData.ACCOUNT_NAME, uid, formData.CURRENCY_ID));
        if (isTransfer) {
            // token, customer_id, receiver, sender, amount)
            dispatch(startCreatingTranfer(token, uid, formData.RECEIVER_ID, formData.ACCOUNT_ID, formData.TRANSACTION_AMOUNT));
        }
        else {
            dispatch(startCreatingTransaction(token, uid, formData.ACCOUNT_ID, formData.CATEGORY_ID, formData.TRANSACTION_TYPE, formData.TRANSACTION_AMOUNT));
        }
        handleClose();
      };

  return (
    <>
     <Grid container spacing={0}>
        <Grid item xs={12} sm={2} key={'transaction'}>
            <Button variant="contained" color = "primary" fullWidth = {true} onClick={(e) => handleClickOpen(false,e)}>
                Make a transaction
            </Button>
        </Grid>
        
        <Grid item xs={12} sm={2} key={'transfer'}>
            <Button variant="contained" color = "secondary" fullWidth = {true}  onClick={(e) => handleClickOpen(true,e)}>
                Transfer between accounts
            </Button>
        </Grid>
    </Grid>
    <br></br>
    <Grid container spacing={0}>
        <Grid item xs={12} sm={2} key={'filter account'}>
            <InputLabel id="filter_account_id">Account</InputLabel>
                <Select
                    margin="dense"
                    label="Currency"
                    labelId="filter_account_id"
                    name="account_id"
                    fullWidth
                    value={filterForm.account_id}
                    onChange={handleChangeFilter}
                >
                {itemList.map((item) => (
                <MenuItem key={item.ID} value={item?.ID}>{`${item.ACCOUNT_NAME} (Balance: ${item.ACCOUNT_MONEY?.toFixed(2)}) ${getCurrencyName(item.CURRENCY_ID)}`}</MenuItem>
                ))}
            </Select>
        </Grid>
        <Grid item xs={12} sm={2} key={'filter category'}>
            <InputLabel id="filter_account_id">Category</InputLabel>
                <Select
                    margin="dense"
                    label="Currency"
                    labelId="filter_account_id"
                    name="category_id"
                    fullWidth
                    value={filterForm.category_id}
                    onChange={handleChangeFilter}
                >{categoriesList.map((item) => (
                    <MenuItem key={item.ID} value={item.ID}>{item.VALUE}</MenuItem>
                  ))}
            </Select>
        </Grid>
        <Grid item xs={12} sm={2} key={'filter date'}>
            <TextField
            label="Fecha"
            name="date"
            value={filterForm.date}
            onChange={handleChangeFilter}
            InputProps={{
                placeholder: 'MM-DD-YYYY'
            }}
            />
        </Grid>
        
        <Grid item xs={12} sm={2} key={'transfer'}>
            <Button variant="contained" color = "primary" fullWidth = {true}  onClick={handleFilter} startIcon={<FilterAltIcon />}>
                Filter
            </Button>
        </Grid>
        
        <Grid item xs={12} sm={2} key={'clear'}>
            <Button variant="contained" fullWidth = {true}  onClick={handleclear} startIcon={<BackspaceIcon />}>
                Clear Filter
            </Button>
        </Grid>
    </Grid>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">{isTransfer ? 'Transfer between accounts' : 'Create new Transaction' }</DialogTitle>
        <DialogContent>
            <InputLabel id="account_id">{isTransfer ? 'Sender Account' : 'Account'}</InputLabel>
            <Select
                margin="dense"
                label="Currency"
                labelId="account_id"
                name="ACCOUNT_ID"
                fullWidth
                value={formData.ACCOUNT_ID}
                onChange={handleChange}
            >
            {itemList.map((item) => (
              <MenuItem key={item.ID} value={item?.ID}>{`${item.ACCOUNT_NAME} (Balance: ${item.ACCOUNT_MONEY?.toFixed(2)}) ${getCurrencyName(item.CURRENCY_ID)}`}</MenuItem>
            ))}
            </Select>
            
            {isTransfer && <InputLabel id="receiver_id">Receiver Account</InputLabel>}
            {isTransfer && 
                <Select
                    margin="dense"
                    label="Currency"
                    labelId="receiver_id"
                    name="RECEIVER_ID"
                    fullWidth
                    value={formData.RECEIVER_ID}
                    onChange={handleChange}
                >
                {itemList.map((item) => (
                <MenuItem key={item.ID} value={item.ID}>{`${item.ACCOUNT_NAME} (Balance: ${item.ACCOUNT_MONEY?.toFixed(2)}) ${getCurrencyName(item.CURRENCY_ID)}`}</MenuItem>
                ))}
                </Select>
            }

            {!isTransfer&& <InputLabel id="transaction_type_label">Transaction Type</InputLabel>}
            {!isTransfer&& <Select
                margin="dense"
                label="Currency"
                labelId="transaction_type_label"
                name="TRANSACTION_TYPE"
                fullWidth
                value={formData.TRANSACTION_TYPE}
                onChange={handleChange}
            >
            {transactionTypes.map((item) => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
            </Select>
            }
            <InputLabel id="transaction_cat_label">Transaction Category</InputLabel>
            <Select
                margin="dense"
                label="Currency"
                labelId="transaction_cat_label"
                name="CATEGORY_ID"
                disabled = {isTransfer}
                fullWidth
                value={formData.CATEGORY_ID}
                onChange={handleChange}
            >
            {categoriesList.map((item) => (
              <MenuItem key={item.ID} value={item.ID}>{item.VALUE}</MenuItem>
            ))}
            </Select>
            <TextField
                margin="dense"
                label={isTransfer ? `Amount to send ${getAccountCurrency(formData.ACCOUNT_ID)}` : `Amount ${getAccountCurrency(formData.ACCOUNT_ID)}`}
                type="number"
                name="TRANSACTION_AMOUNT"
                fullWidth
                value={formData.TRANSACTION_AMOUNT}
                onChange={handleChange}
             />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
            <Button onClick={handleSubmit} color="primary">
                Create
            </Button>
        </DialogActions>
      </Dialog>
    <TableContainer component={Paper}>
    <Table>
        <TableHead>
        <TableRow style = {{'backgroundColor': '#DDFFF9'}}>
            <TableCell>ID</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Actions</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {transactionList.map(transaction => (
            <TableRow key={transaction.ID} style = {{'backgroundColor': transaction.TRANSACTION_TYPE === 'INCOME' ? '#DEFFCA' : '#FFE9C9'}}>
            <TableCell>{transaction.ID}</TableCell>
            <TableCell>{getAccountName(transaction.ACCOUNT_ID)}</TableCell>
            <TableCell>{getCategoryName(transaction.CATEGORY_ID)}</TableCell>
            <TableCell>{getCurrencyName(transaction.CURRENCY_ID)}</TableCell>
            <TableCell>{transaction.TRANSACTION_AMOUNT?.toFixed(2)}</TableCell>
            <TableCell>{transaction.TRANSACTION_TYPE}</TableCell>
            <TableCell>
            <IconButton onClick={() => handleClickDelete(transaction.ID)}>
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
