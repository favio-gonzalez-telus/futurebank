const { pool } = require('./../utils/oracle');

const create = ({ 
    name,
    customer_id,
    currency_id,
    account_money
 })=>{
    const bindings = {
        name,
        customer_id,
        currency_id,
        account_money
    };
    console.log(bindings);
    const SQL_REGISTER_ACCOUNT = `
    INSERT INTO ACCOUNT (ID,CUSTOMER_ID,CURRENCY_ID,ACCOUNT_MONEY,ACCOUNT_NAME,ACCOUNT_NUMBER)
    VALUES(SQ_ACCOUNT.NEXTVAL, :customer_id, :currency_id, :account_money, :name, API_TOKEN(TO_CHAR(SYSDATE,'DD-MM-YYYY HH24:MI:SS')) )
    `;
    return pool(SQL_REGISTER_ACCOUNT, bindings, { autoCommit: true });
}

const findAll = () => {
    const SQL_FIND_ALL = `SELECT * FROM ACCOUNT`;
    return pool(SQL_FIND_ALL);
}

const findById = ({ id })=>{
    const bindings = {
        id
    };
    const SQL_BY_ID = `
    SELECT * FROM ACCOUNT WHERE CUSTOMER_ID = :id
    `;
    return pool(SQL_BY_ID, bindings);
}

const findAccountById = ({ id })=>{
    const bindings = {
        id
    };
    const SQL_BY_ID = `
    SELECT * FROM ACCOUNT WHERE ID = :id
    `;
    return pool(SQL_BY_ID, bindings);
}

const updateById = ({
    id, 
    name,
    account_money})=> {
    const bindings = {
        id,
        name
    };

    console.log(bindings);
    const SQL_UPDATE_ACCOUNT = `UPDATE ACCOUNT
            SET
            ACCOUNT_NAME = :name,
            MOD_DATE = SYSDATE
            WHERE ID = :id`;
    return pool(SQL_UPDATE_ACCOUNT, bindings, { autoCommit: true });
}

const updateMoneyById = ({id, account_money})=> {
    const bindings = {
        id,
        account_money
    };
    const SQL_UPDATE_ACCOUNT = `UPDATE ACCOUNT
            SET
            ACCOUNT_MONEY = :account_money
            WHERE ID = :id`;
    return pool(SQL_UPDATE_ACCOUNT, bindings, { autoCommit: true });
}

const deleteById = ({ id })=>{
    const bindings = {
        id
    };
    const SQL_UPDATE_ACCOUNT = `DELETE FROM ACCOUNT WHERE ID = :id`;
    return pool(SQL_UPDATE_ACCOUNT, bindings, { autoCommit: true });
}

module.exports = {
    create, findAll, findById, updateById, deleteById, updateMoneyById, findAccountById
}