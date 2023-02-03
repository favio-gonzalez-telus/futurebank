 const bcrypt = require('bcryptjs');
 const { pool } = require('./../utils/oracle');
 const oracledb = require('oracledb');

 module.exports.create = ({ email, password, first_name, last_name })=>{
    const bindings = {
        email,
        password: bcrypt.hashSync(password,8),
        first_name,
        last_name,
        person_token: { type: oracledb.STRING, dir:oracledb.BIND_OUT }
    };
    const SQL_REGISTER_PERSON = `
    INSERT INTO CUSTOMER (ID,EMAIL,PASSWORD,FIRST_NAME, LAST_NAME,TOKEN_PERSON)
    VALUES(SQ_CUSTOMER.NEXTVAL, :email, :password, :first_name, :last_name, API_TOKEN(TO_CHAR(SYSDATE,'DD-MM-YYYY HH24:MI:SS') || :password) )
    RETURNING TOKEN_PERSON INTO :person_token`;
    return pool(SQL_REGISTER_PERSON, bindings, { autoCommit: true });
 }
 
 module.exports.hashPassword = ({ email })=>{
    const bindings = {
        email
    };
    const SQL_HASH_PASSWORD = `SELECT PASSWORD FROM CUSTOMER WHERE EMAIL = :email`;
    return pool(SQL_HASH_PASSWORD, bindings);
}

 module.exports.login = ({email, password })=>{
    const bindings = {
        email,
        password: bcrypt.hashSync(password,8),
        person_token: { type: oracledb.STRING, dir:oracledb.BIND_OUT }
    };
    const SQL_LOGIN_PERSON = `UPDATE CUSTOMER
                SET
            MOD_DATE = SYSDATE,
            TOKEN_PERSON = API_TOKEN(TO_CHAR(SYSDATE,'DD-MM-YYYY HH24:MI:SS') || :password)
            WHERE EMAIL = :email
            RETURNING TOKEN_PERSON INTO :person_token`;
    return pool(SQL_LOGIN_PERSON, bindings, { autoCommit: true });
}

module.exports.getUserId = ({email })=>{
    const bindings = {
        email
    };
    const SQL_LOGIN_PERSON = `SELECT ID FROM CUSTOMER WHERE EMAIL = :email`;
    return pool(SQL_LOGIN_PERSON, bindings, { autoCommit: true });
}
