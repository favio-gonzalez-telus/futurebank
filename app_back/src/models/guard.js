const { pool } = require('./../utils/oracle');

module.exports.checkToken = ({ person_token })=>{
    const bindings = {
        person_token
    };
    const SQL_CHECK_TOKEN = `SELECT
        ID AS "id",
        EMAIL AS "email",
        FIRST_NAME AS "first_name",
        LAST_NAME AS "last_name"
        FROM CUSTOMER WHERE TOKEN_PERSON = :person_token`;
    return pool(SQL_CHECK_TOKEN, bindings);
}