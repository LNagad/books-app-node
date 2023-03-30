
const Author = require('../models/Author');

exports.getAuthorPage = async (req, res) => {

    const authors = await Author.findAll({ raw: true });
    
    res.status(200).render('author/author', {
        pageName: 'author',
        authors,
        hasAuthor: authors.length > 0
    });
};

exports.getCreate = (req, res) => {
    res.status(200).render('author/save', {
        pageName: 'Create author',
        editMode: false
    });
};

exports.postCreate = (req, res) => {
    const { body } = req;
    const { Name, Email} = body;

    if (!Name && !Email) {
        return res.status(400).redirect('/author');
    } 
    
    Author.create({name: Name, email: Email}).then( () => {
        return res.status(200).redirect('/author');
    }).catch(err => {
        console.log(err);
        return res.status(500).redirect('/author');
    });
};


exports.getEdit = (req, res) => {
    
    const Id = req.params.Id;
    
    if (!Id) {
        return res.status(500).redirect('/author');
    }

    Author.findOne({where: {id: Id}}).then(result => {
        res.status(200).render('author/save', {
            pageName: 'Edit author',
            editMode: true,
            author: result.dataValues
        });
    }).catch(err => {
        console.log(err);
        return res.status(500).redirect('/author');
    });
};


exports.postEdit = (req, res) => {
    const { body } = req;
    const { Name, Email, authorId} = body;

    
    !authorId ?  res.redirect('/author') : '';

    if (!Name && !Email) {
        return res.status(400).redirect('/author');
    } 
    
    Author.update(
        {name: Name, email: Email}, 
        {where: {id: authorId}} 
    ).then( () => {

        return res.status(200).redirect('/author');

    }).catch(err => {

        console.log(err);
        return res.status(500).redirect('/author');
    });
};


exports.Delete = (req, res) => {
    
    const Id = req.params.Id;
    
    if (!Id) {
        return res.status(500).redirect('/author');
    }

    Author.findOne({where: {id: Id}}).then(result => {

        const authorFound = result.dataValues;

        Author.destroy({where: {id: authorFound.id}}).then( () =>{
            res.status(200).redirect('/author');
        });

    }).catch(err => {
        console.log(err);
        return res.status(500).redirect('/author');
    });
};