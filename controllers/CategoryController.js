
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
        return res.status(200).redirect('/');
    }).catch(err => {
        console.log(err);
        return res.status(500).redirect('/');
    });
};
