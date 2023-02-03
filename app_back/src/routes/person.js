const express = require('express');
const router =  express.Router();
const { registePerson, loginPerson } = require('./../controllers/person');

//register
router.post('/register', registePerson);
//login
router.post('/login', loginPerson);

module.exports = router;