const oracledb = require('oracledb');
const path = require('path');
const {oracleConfig} = require('./../config/config');
//path to client


const clientPath = path.join('C:','Oracle','instantclient_21_8');

//init client
oracledb.initOracleClient({ libDir:clientPath });

//start db
module.exports.start = async () =>{
    await oracledb.createPool(oracleConfig);
}

//close db
module.exports.close = async () => {
    await oracledb.getPool().close(0);
}

module.exports.pool = async (statement, binds = [], opts = {}) => {
    let conn;
    let result = [];
    opts.outFormat = oracledb.OBJECT;
    try {
        conn = await oracledb.getConnection();
        result = await conn.execute(statement, binds, opts);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (error) {
                console.log(error);
            }
        };
    };
};