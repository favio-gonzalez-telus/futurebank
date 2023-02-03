const Category = require('./../models/category');

//GET ALL ---> GET
const getAll = async (req, res, next) => {
    try {
        const { rows } = await Category.findAll();
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
        const { rows } = await Category.findById(args);
        res.status(200).json({ data: rows });
    } catch (error) {
        res.status(400).json({ error: error });
        //next(error);
    }
}
//CREATE ---> POST
const createCategory = async (req, res, next) => {
    console.log(req.person);
    if (!req.body.title || !req.body.body) {
        return res.status(400).json({ message: "missing to enter data" });
    }
    const args = {
        person_id: req.person.id,
        title: req.body.title,
        body: req.body.body
    }
    try {
        await Category.create(args);
        res.status(200).json({ message: 'created' });
    } catch (error) {
        res.status(400).json({ error: error });
        //next(error);
    }
}
//DELETE ---> DELETE
const deleteCategory = async (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).json({ message: "missing to enter data" });
    }
    try {
        const args = {
            id: req.body.id,
            person_id: req.person.id,
        }
        const { rows } = await Category.personIDbyID(args);
        //console.log(rows);
        if (rows.length > 0 && rows[0]['PERSON_ID'] === args.person_id) {
            await Category.deleteById(args);
            return res.status(200).json({ message: 'deleted' });
        }
        res.status(200).json({ message: 'faltan permisos' });
    } catch (error) {
        res.status(400).json({ error: error });
        //next(error);
    }
}
//UPDATE ---> PUT
const updateCategory = async (req, res, next) => {
    if (!req.body.title || !req.body.body || !req.body.id) {
        return res.status(400).json({ message: "missing to enter data" });
    }
    try {
        const args = {
            id: req.body.id,
            person_id: req.person.id,
            title: req.body.title,
            body: req.body.body
        }
        const { rows } = await Category.personIDbyID(args);
        //console.log(rows);
        if (rows.length > 0 && rows[0]['PERSON_ID'] === args.person_id) {
            await Category.updateById(args);
            return res.status(200).json({ message: 'update' });
        }
        res.status(200).json({ message: 'faltan permisos' });
    } catch (error) {
        res.status(400).json({ error: error });
        //next(error);
    }
}

module.exports = {
    getAll,
    getByID,
    createCategory,
    deleteCategory,
    updateCategory
}