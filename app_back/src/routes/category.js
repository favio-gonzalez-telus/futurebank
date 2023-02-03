const express = require('express');
const { getAll, getByID, createCategory, deleteCategory, updateCategory} = require('./../controllers/category');
const router = express.Router();
const guard = require('./../guard/guard');

//GET ALL ---> GET
router.get('/category',getAll);
//GET BY ID ---> GET
router.get('/category/:id',getByID);
//CREATE ---> POST
router.post('/category',guard,createCategory);
//DELETE ---> DELETE
router.delete('/category',guard,deleteCategory);
//UPDATE ---> PUT
router.put('/category',guard,updateCategory);




module.exports = router;