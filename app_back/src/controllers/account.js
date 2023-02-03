const Account = require('./../models/account');

//GET ALL ---> GET
const getAll = async (req, res, next) => {
    try {
        const { rows } = await Account.findAll();
        res.status(200).json({ data: rows });
    } catch (error) {
        res.status(400).json({ error: error });
        //next(error);
    }
}
//GET BY ID ---> GET
const getByID = async (req, res, next) => {
    const { id } = req.params;
    const args = {
        id: Number(id)
    }
    try {
        const { rows } = await Account.findById(args);
        res.status(200).json({ data: rows });
    } catch (error) {
        res.status(400).json({ error: error });
        //next(error);
    }
}
//CREATE ---> POST
const createAccount = async (req, res, next) => {
    const args = {
        name: req.body.name,
        customer_id: req.body.customer_id,
        currency_id: req.body.currency_id,
        account_money: 0,
    }
    try {
        await Account.create(args);
        res.status(200).json({ message: 'created' });
    } catch (error) {
        
        console.log(error);
        res.status(400).json({ error: error });
        //next(error);
    }
}
//DELETE ---> DELETE
const deleteAccount = async (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).json({ message: "missing to enter data" });
    }
    try {
        const args = {
            id: req.body.id
        }
        await Account.deleteById(args);
        return res.status(200).json({ message: 'deleted' });
    } catch (error) {
        res.status(400).json({ error: error });
        //next(error);
    }
}
//UPDATE ---> PUT
const updateAccount = async (req, res, next) => {

    try {
        const args = {
            id: req.body.id,
            name: req.body.name
        }
        //console.log(rows);
        await Account.updateById(args);
        return res.status(200).json({ message: 'update' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
        //next(error);
    }
}


//UPDATE ---> PUT
const updateMoney = async (req, res, next) => {

    try {
        const args = {
            id: req.body.id,
            account_money: req.body.account_money
        }
        console.log(args);
        //console.log(rows);
        await Account.updateMoneyById(args);
        return res.status(200).json({ message: 'update' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
        //next(error);
    }
}

module.exports = {
    getAll,
    getByID,
    createAccount,
    deleteAccount,
    updateAccount,
    updateMoney
}