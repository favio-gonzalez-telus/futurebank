import { createSlice } from '@reduxjs/toolkit'

export const optionsSlice = createSlice ({
    name: 'options',
    initialState: {
        activeOption: 'DASHBOARD',
        currencies: [{id: 2, name: 'GTQ'}, {id: 1, name: 'USD'}],
        transactionTypes: ['EXPENSE','INCOME'],
        itemList: [],
        categoriesList: [],
        transactions: [],
        dashboard: []
    },
    reducers: {
        setActiveOption: (state, action) => {
            state.activeOption = action.payload;
        },
        setItemlist: (state, action) => {
            state.itemList = action.payload;
        },
        setCategoriesList: (state, action) => {
            state.categoriesList = action.payload;
        },
        setTransactions: (state, action) => {
            state.transactions = action.payload;
        },
        setDashboard: (state, action) => {
            console.log('PAYLOAAAD');
            console.log(action.payload);
            state.dashboard = action.payload;
        },
    }
});

export const { 
    setActiveOption,
    setItemlist,
    setCategoriesList,
    setTransactions,
    setDashboard
 } = optionsSlice.actions;

