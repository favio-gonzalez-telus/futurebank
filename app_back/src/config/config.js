const dotenv = require('dotenv');

dotenv.config(); // .env ---> variables globales

module.exports = {
    server:{
        port: process.env.SERVER_PORT
    },
    oracleConfig:{
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectString: process.env.DB_CONNECT_STRING,
        poolMin:10,
        poolMax:10,
        poolIncrement:0
    }
}