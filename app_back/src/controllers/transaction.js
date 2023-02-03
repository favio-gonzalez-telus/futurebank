const Category = require('./../models/category');
const Transaction = require('./../models/transaction');
const Account = require('./../models/account');
const { response } = require('express');

//GET ALL ---> GET
const getAll = async (req, res, next) => {
    try {
        const { rows } = await Transaction.findAll();
        res.status(200).json({ data: rows });
    } catch (error) {
        res.status(400).json({ error: error });
        //next(error);
    }
}
//GET BY ID ---> GET
const getByID = async (req, res, next) => {
    const { id } = req.params;
    const args = {
        id: Number(id),
        filters: req.query.filters
    }
    try {
        const { rows } = await Transaction.findById(args);
        res.status(200).json({ data: rows });
    } catch (error) {
        res.status(400).json({ error: error });
        //next(error);
    }
}
//CREATE ---> POST
const createTransaction = async (req, res, next) => {
    const args = {
        account_id: req.body.account_id,
        category_id: req.body.category_id,
        transaction_type: req.body.transaction_type,
        transaction_amount: req.body.transaction_amount
    }
    try {
        const response_receiver = await Account.findAccountById({id: args.account_id});
        const receiver = response_receiver.rows[0];

        args.currency_id = receiver.CURRENCY_ID;

        await Transaction.create(args);
        args.transaction_type === 'INCOME' ? receiver.ACCOUNT_MONEY = receiver.ACCOUNT_MONEY + args.transaction_amount : receiver.ACCOUNT_MONEY = receiver.ACCOUNT_MONEY - args.transaction_amount;
        await Account.updateMoneyById({id: receiver.ID, account_money: receiver.ACCOUNT_MONEY});

        res.status(200).json({ message: 'created' });
    } catch (error) {
        
        console.log(error);
        res.status(400).json({ error: error });
        //next(error);
    }
}
//DELETE ---> DELETE
const deleteTransaction = async (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).json({ message: "missing to enter data" });
    }
    try {
        const args = {
            id: req.body.id
        }

        const transaction_response = await Transaction.getTransactionById({transaction_id: args.id});
        const transaction = transaction_response.rows[0];

        const response_receiver = await Account.findAccountById({id: transaction.ACCOUNT_ID});
        const receiver = response_receiver.rows[0];

        console.log(transaction);
        console.log(receiver);
        let balance;
        if (transaction.TRANSACTION_TYPE === 'EXPENSE') {
            balance = receiver.ACCOUNT_MONEY + transaction.TRANSACTION_AMOUNT;
        } else {
            balance = receiver.ACCOUNT_MONEY - transaction.TRANSACTION_AMOUNT;
        }

        await Account.updateMoneyById({id:receiver.ID, account_money:balance});
        await Transaction.deleteById(args);
        return res.status(200).json({ message: 'deleted' });
    } catch (error) {
        res.status(400).json({ error: error });
        //next(error);
    }
}
//UPDATE ---> PUT
const updateTransaction = async (req, res, next) => {

    try {
        const args = {
            id: req.body.id,
            amount: req.body.amount,
            type: req.body.type,
            account_id: req.body.account_id
        }
        console.log(args);
        //console.log(rows);
        await Transaction.updateById(args);
        return res.status(200).json({ message: 'update' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
        //next(error);
    }
}

const transferBetweenAccounts = async (req, res, next) => {

    try {
        const args = {
            receiver: req.body.receiver,
            sender: req.body.sender,
            amount: req.body.amount
        }


        const response_receiver = await Account.findAccountById({id: args.receiver});
        const response_sender = await Account.findAccountById({id: args.sender});
        const response_category = await Category.getCategoryIdByName({name: 'Transfer'});

        const receiver = response_receiver.rows[0];
        const sender = response_sender.rows[0];
        const category = response_category.rows[0];

        const transactionsParent = {
            currency_id: receiver.CURRENCY_ID
        }

        sender.ACCOUNT_MONEY = sender.ACCOUNT_MONEY - args.amount;

        const expense_amount = req.body.amount;
        let income_amount = req.body.amount;
        if(receiver.CURRENCY_ID === sender.CURRENCY_ID ) {
            receiver.ACCOUNT_MONEY = receiver.ACCOUNT_MONEY + args.amount;
        } else {
            const response_currency = await Transaction.getCurrency({id: sender.CURRENCY_ID});
            const currency = response_currency.rows[0];
            income_amount = (args.amount * currency.CONVERSION);
            receiver.ACCOUNT_MONEY = receiver.ACCOUNT_MONEY + income_amount;

        }

        await Account.updateMoneyById({id:receiver.ID, account_money:receiver.ACCOUNT_MONEY});
        await Account.updateMoneyById({id:sender.ID, account_money:sender.ACCOUNT_MONEY});



        const expense = {
            account_id: sender.ID,
            currency_id: sender.CURRENCY_ID,
            category_id: category.ID,
            transaction_type: 'EXPENSE',
            transaction_amount: expense_amount
        }

        const income = {
            account_id: receiver.ID,
            currency_id: receiver.CURRENCY_ID,
            category_id: category.ID,
            transaction_type: 'INCOME',
            transaction_amount: income_amount
        }
    
        await Transaction.create(expense);
        await Transaction.create(income);

        return res.status(200).json({ message: 'done!' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
        //next(error);
    }
}

const getFullDashboard = async (req, res, next) => {
    let response = {}
    const args = {
        customer_id: req.query.customer_id
    }
    try {
        const balance_receiver = await Transaction.getCurrencyBalance({customer_id: args.customer_id});
        const incomesCount_receiver = await Transaction.getIncomesOutcomesCount({id: args.customer_id});
        console.log(incomesCount_receiver);
        response.balance = balance_receiver.rows;
        response.incomes_expenses = incomesCount_receiver.rows;
        res.status(200).json(response);
    } catch (error) {
        
        console.log(error);
        res.status(400).json({ error: error });
        //next(error);
    }
}

module.exports = {
    getAll,
    getByID,
    createTransaction,
    deleteTransaction,
    updateTransaction,
    transferBetweenAccounts,
    getFullDashboard
}