const { pool } = require('./../utils/oracle');

const findAll = () => {
    const SQL_FIND_ALL = `SELECT * FROM BANK_TRANSACTION`;
    return pool(SQL_FIND_ALL);
}

const findById = ({ id, filters })=>{
    let prepare_filter = '';
    console.log('FILTERS');
    console.log(filters);
    if ( filters?.account_id && filters.account_id !== '') {
        prepare_filter = prepare_filter + ` AND ACCOUNT_ID = ${filters.account_id} `
    }

    if ( filters?.category_id && filters.category_id !== '') {
        prepare_filter = prepare_filter + ` AND CATEGORY_ID = ${filters.category_id} `
    }

    if ( filters?.date && filters.date !== '') {
        prepare_filter = prepare_filter + ` AND bt.ADD_DATE BETWEEN TO_DATE('${filters.date} 00:01', 'dd-MM-yyyy HH24:MI') AND TO_DATE('${filters.date} 23:59', 'dd-MM-yyyy HH24:MI')`
    }
    
    const bindings = {
        id
    };

    console.log(prepare_filter);
    const SQL_BY_ID = `
    SELECT bt.* FROM BANK_TRANSACTION bt JOIN ACCOUNT a ON bt.ACCOUNT_ID = a.ID WHERE a.CUSTOMER_ID = :id ${prepare_filter}
    `;
    return pool(SQL_BY_ID, bindings);
}

const getCurrency = ({id})=>{
    const bindings = {
        id
    };
    const SQL_BY_ID = `
    SELECT * FROM CURRENCY WHERE ID = :id
    `;
    return pool(SQL_BY_ID, bindings);
}

const getIncomesOutcomesCount = ({id})=>{
    const bindings = {
        id
    };
    const SQL_BY_ID = `
    SELECT bt.TRANSACTION_TYPE, COUNT(bt.id) FROM BANK_TRANSACTION bt JOIN ACCOUNT a ON bt.ACCOUNT_ID = a.ID WHERE a.CUSTOMER_ID = :id GROUP BY bt.TRANSACTION_TYPE
    `;
    return pool(SQL_BY_ID, bindings);
}

const getCurrencyBalance = ({customer_id})=>{
    const bindings = {
        customer_id
    };
    const SQL_BY_ID = `
    SELECT SUM(ACCOUNT_MONEY) as Total_Money, NAME
    FROM ACCOUNT
    JOIN CURRENCY ON ACCOUNT.CURRENCY_ID = CURRENCY.ID
    WHERE CUSTOMER_ID = :customer_id
    GROUP BY NAME
    `;
    return pool(SQL_BY_ID, bindings);
}

const getTransactionById = ({transaction_id})=>{
    console.log(transaction_id);
    const bindings = {
        transaction_id
    };
    const SQL_BY_ID = `SELECT * FROM BANK_TRANSACTION WHERE ID = :transaction_id
    `;
    return pool(SQL_BY_ID, bindings);
}

const create = ({  
    account_id,
    currency_id,
    category_id,
    transaction_type,
    transaction_amount})=>{
    const bindings = {
        account_id,
        currency_id,
        category_id,
        transaction_type,
        transaction_amount
    };
    console.log(bindings);
    const SQL_REGISTER_ACCOUNT = `INSERT INTO BANK_TRANSACTION (ID, ACCOUNT_ID, CURRENCY_ID, CATEGORY_ID, TRANSACTION_TYPE, TRANSACTION_AMOUNT)
    VALUES(SQ_TRANSACTION.NEXTVAL, :account_id, :currency_id, :category_id, :transaction_type, :transaction_amount)`;
    let response = pool(SQL_REGISTER_ACCOUNT, bindings, { autoCommit: true });


    return response;
}

const updateById = ({id,amount, type, account_id})=> {
    const bindings = {
        id,
        amount,
        type,
        account_id
    };

    console.log(bindings);
    const SQL_UPDATE_ACCOUNT = `UPDATE BANK_TRANSACTION
            SET
            TRANSACTION_AMOUNT = :amount,
            ACCOUNT_ID = :account_id,
            TRANSACTION_TYPE = :type
            WHERE ID = :id`;
    return pool(SQL_UPDATE_ACCOUNT, bindings, { autoCommit: true });
}

const deleteById = ({ id })=>{
    const bindings = {
        id
    };
    const SQL_UPDATE_ACCOUNT = `DELETE FROM BANK_TRANSACTION WHERE ID = :id`;
    return pool(SQL_UPDATE_ACCOUNT, bindings, { autoCommit: true });
}

module.exports = {
    findAll, create, findById, updateById, deleteById, getCurrency, getCurrencyBalance, getTransactionById, getIncomesOutcomesCount
}