
const Category = require('../models/Category');



exports.getCategoriesPage = async (req, res) => {

    const categories = await Category.findAll({ raw: true });

    res.status(200).render('category/category', {
        pageName: 'Categories',
        categories,
        hasCategories: categories.length > 0
    });
};

exports.getCreate = (req, res) => {
    res.status(200).render('category/save', {
        pageName: 'Create category',
        editMode: false
    });
};

exports.postCreate = (req, res) => {
    const { body } = req;
    const { Name, Description } = body;

    if (!Name && !Description) {
        return res.status(400).redirect('/');
    } 
    
    Category.create({name: Name, description: Description}).then( () => {
        return res.status(200).redirect('/category');
    }).catch(err => {
        console.log(err);
        return res.status(500).redirect('/category');
    });
};


exports.getEdit = (req, res) => {
    
    const Id = req.params.Id;
    
    if (!Id) {
        return res.status(500).redirect('/category');
    }
    Category.findOne({where: {id: Id}}).then(result => {
        res.status(200).render('category/save', {
            pageName: 'Edit category',
            editMode: true,
            category: result.dataValues
        });
    }).catch(err => {
        console.log(err);
        return res.status(500).redirect('/category');
    });
};


exports.postEdit = (req, res) => {
    const { body } = req;
    const { Name, Description, CategoryId } = body;

    !CategoryId ?  res.redirect('/category') : '';

    if (!Name || !Description) {
        return res.status(400).redirect('/category');
    } 
    
    Category.update(
        {name: Name, description: Description}, 
        {where: {id: CategoryId}} 
    ).then( () => {

        return res.status(200).redirect('/category');

    }).catch(err => {

        console.log(err);
        return res.status(500).redirect('/category');
    });
};


exports.Delete = (req, res) => {
    
    const Id = req.params.Id;
    
    if (!Id) {
        return res.status(500).redirect('/category');
    }

    Category.findOne({where: {id: Id}}).then(result => {

        const categoryFound = result.dataValues;

        Category.destroy({where: {id: categoryFound.id}}).then( () =>{
            res.status(200).redirect('/category');
        });

    }).catch(err => {
        console.log(err);
        return res.status(500).redirect('/category');
    });
};