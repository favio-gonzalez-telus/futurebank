const { pool } = require('./../utils/oracle');

const create = ({ person_id, title, body })=>{
    const bindings = {
        person_id,
        title,
        body,
    };
    const SQL_REGISTER_CATEGORY = `
    INSERT INTO CATEGORY (ID,PERSON_ID,TITLE,TEXT)
    VALUES(SQ_CATEGORY.NEXTVAL, :person_id, :title, :body)
    `;
    return pool(SQL_REGISTER_CATEGORY, bindings, { autoCommit: true });
}
const findAll = () => {
    const SQL_FIND_ALL = `SELECT * FROM CATEGORY`;
    return pool(SQL_FIND_ALL);
}

const findById = ({ id })=>{
    const bindings = {
        id
    };
    const SQL_BY_ID = `
    SELECT * FROM CATEGORY WHERE ID = :id
    `;
    return pool(SQL_BY_ID, bindings);
}
const personIDbyID = ({ id })=>{
    const bindings = {
        id
    };
    const SQL_BY_ID = `SELECT PERSON_ID FROM CATEGORY WHERE ID = :id`;
    return pool(SQL_BY_ID, bindings);
};
const updateById = ({id, title, body })=> {
    const bindings = {
        id,
        title,
        body
    };
    const SQL_UPDATE_CATEGORY = `UPDATE CATEGORY
            SET
            TITLE = :title,
            TEXT = :body
            WHERE ID = :id`;
    return pool(SQL_UPDATE_CATEGORY, bindings, { autoCommit: true });
}

const deleteById = ({ id })=>{
    const bindings = {
        id
    };
    const SQL_UPDATE_CATEGORY = `DELETE FROM CATEGORY WHERE ID = :id`;
    return pool(SQL_UPDATE_CATEGORY, bindings, { autoCommit: true });
}

const getCategoryIdByName = ({name})=>{
    const bindings = {
        name
    };
    const SQL_BY_ID = `
    SELECT * FROM CATEGORY WHERE VALUE = :name
    `;
    return pool(SQL_BY_ID, bindings);
}

module.exports = {
    create, findAll, findById, updateById, deleteById,personIDbyID,getCategoryIdByName
}