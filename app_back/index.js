const express = require('express');
const { server } = require('./src/config/config');
const app =  express();
const cookie = require('cookie-parser');
const cors = require('cors');
const categoryRoutes = require('./src/routes/category');
const personRoutes = require('./src/routes/person');
const accountRoutes = require('./src/routes/account');
const transactionRoutes = require('./src/routes/transaction')
const notFoundRoutes = require('./src/routes/404');
const oracle = require('./src/utils/oracle');
//const errorMiddelware = require('./src/middlewares/errorMiddelware');

//middelware
app.use(cors());
app.use(cookie());
app.use(express.json());

//routes
app.use(categoryRoutes);
app.use(personRoutes);
app.use(accountRoutes);
app.use(transactionRoutes);
//error middelware
//app.use(errorMiddelware);

app.use(notFoundRoutes);

oracle.start().then(()=>{
    console.log('oracle database connected.');
    app.listen(server.port,()=>{
        console.log(`Server listening on port: ${server.port}`);
    })
}).catch((error)=>{
    console.log(error);
    process.exit(1);
})