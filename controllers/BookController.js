
const Book = require('../models/Book');
const Author = require('../models/Author')
const Category = require('../models/Category')
const Publisher = require('../models/Publisher')

exports.getBookPage = async (req, res) => {

    const books = await Book.findAll({ raw: true });

    res.status(200).render('book/book', {
        pageName: 'book',
        books,
        hasBook: books.length > 0
    });
};

exports.getCreate = async (req, res) => {

    const authors = await Author.findAll({ raw: true });
    const categories = await Category.findAll({ raw: true });
    const publishers = await Publisher.findAll({ raw: true });
    
    res.status(200).render('book/save', {
        pageName: 'Create book',
        editMode: false,
        authors, categories, publishers
    });
};

exports.postCreate = (req, res) => {
    const { body } = req;
    const { Name, Date, Image, CategoryId, AuthorId, PublisherId} = body;

    if (!Name || !Date || !Image || !CategoryId || !AuthorId || !PublisherId) {
        return res.status(400).redirect('/book');
    }
    
    Book.create({
        title: Name, 
        yearReleased: Date, 
        imagePath: Image,
        AuthorId,
        CategoryId,
        PublisherId
    }).then( () => {

        return res.status(200).redirect('/book');

    }).catch(err => {
        console.log(err);
        return res.status(500).redirect('/book');
    });
};


exports.getEdit = async(req, res) => {
    
    const Id = req.params.Id;
    
    if (!Id) {
        return res.status(500).redirect('/book');
    }
    const authors = await Author.findAll({ raw: true });
    const categories = await Category.findAll({ raw: true });
    const publishers = await Publisher.findAll({ raw: true });

    Book.findOne({where: {id: Id}}).then(result => {
        

        console.log(result.dataValues);

        res.status(200).render('book/save', {
            pageName: 'Edit book',
            editMode: true,
            book: result.dataValues,
            authors, categories, publishers
        });
    }).catch(err => {
        console.log(err);
        return res.status(500).redirect('/book');
    });
};


exports.postEdit = (req, res) => {
    const { body } = req;
    const { Name, Date, Image, CategoryId, AuthorId, PublisherId, bookId} = body;
    
    !bookId ?  res.redirect('/book') : '';

    if (!Name || !Date || !Image || !CategoryId || !AuthorId || !PublisherId) {
        return res.status(400).redirect('/book');
    }
    
    Book.update(
        {
            title: Name, 
            yearReleased: Date, 
            imagePath: Image,
            AuthorId,
            CategoryId,
            PublisherId
        }, 
        {where: {id: bookId}} 
    ).then( () => {

        return res.status(200).redirect('/book');

    }).catch(err => {

        console.log(err);
        return res.status(500).redirect('/book');
    });
};


exports.Delete = (req, res) => {
    
    const Id = req.params.Id;
    
    if (!Id) {
        return res.status(500).redirect('/book');
    }

    Book.findOne({where: {id: Id}}).then(result => {

        const bookFound = result.dataValues;

        Book.destroy({where: {id: bookFound.id}}).then( () =>{
            res.status(200).redirect('/book');
        });

    }).catch(err => {
        console.log(err);
        return res.status(500).redirect('/book');
    });
};