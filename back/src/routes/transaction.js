const express = require('express');
const {getAll, getByID, createTransaction, deleteTransaction, updateTransaction, transferBetweenAccounts, getFullDashboard} = require('./../controllers/transaction');
const router = express.Router();
const guard = require('./../guard/guard');

//GET ALL ---> GET
router.get('/transaction',getAll);
//GET BY ID ---> GET
router.get('/transaction/:id',getByID);
//CREATE ---> POST
router.post('/transaction',guard,createTransaction);
//DELETE ---> DELETE
router.delete('/transaction',guard,deleteTransaction);
//UPDATE ---> PUT
router.put('/transaction',guard,updateTransaction);

router.post('/transfer',guard,transferBetweenAccounts);

router.get('/dashboard',guard,getFullDashboard);

module.exports = router;