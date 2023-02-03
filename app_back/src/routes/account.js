const express = require('express');
const {getAll, getByID, createAccount, deleteAccount, updateAccount, updateMoney} = require('./../controllers/account');
const router = express.Router();
const guard = require('./../guard/guard');

//GET ALL ---> GET
router.get('/account',guard,getAll);
//GET BY ID ---> GET
router.get('/account/:id',getByID);
//CREATE ---> POST
router.post('/account',createAccount);
//DELETE ---> DELETE
router.delete('/account',guard,deleteAccount);
//UPDATE ---> PUT
router.put('/account',guard,updateAccount);
//UPDATE MONEY ---> PUT
router.put('/account/money',guard,updateMoney);


module.exports = router;