
const Book = require('../models/Book');
const Author = require('../models/Author');
const Category = require('../models/Category');
const Publisher = require('../models/Publisher');
const transporter = require('../services/EmailService');
const path = require('path');
const fs = require('fs');


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

exports.postCreate = async (req, res) => {
    const { body, file } = req;
    const { Name, Date, CategoryId, AuthorId, PublisherId} = body;

    if (!Name || !Date  || !CategoryId || !AuthorId || !PublisherId || !file) {
        return res.status(400).redirect('/book');
    }
    const imagePath = `/${file.path}`;

    const author = await Author.findOne( {raw: true, where: {id: AuthorId}} );

    Book.create({
        title: Name, 
        yearReleased: Date, 
        imagePath,
        AuthorId,
        CategoryId,
        PublisherId
    }).then( () => {

        res.status(200).redirect('/book');

        const emailHTML = `<h1 class="btn btn-danger">Libro: ${Name}</h1>`;
        return transporter.sendMail(
            {
                subject: 'Se ha publicado un libro de tu auditoria!',
                from: 'Books-app',
                text: 'Un libro tuyo se ha publicado en la aplicacion Books-app',
                to: author.email,
                html: emailHTML
            }, 
            (err) => {
                console.log('Email error: ',err);
            });
        
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


exports.postEdit = async (req, res) => {
    const { body, file } = req;
    const { Name, Date, CategoryId, AuthorId, PublisherId, bookId} = body;
    const bookImage = file;

    !bookId ?  res.redirect('/book') : '';

    if (!Name || !Date  || !CategoryId || !AuthorId || !PublisherId) {
        return res.status(400).redirect('/book');
    }
    
    const bookExist = await Book.findOne({raw: true, where: {id: bookId}});

    if (!bookExist) {
        return res.status(400).redirect('/book');
    }

    const imagePath = bookImage ? `/${bookImage.path}` : bookExist.imagePath; 

    Book.update(
        {
            title: Name, 
            yearReleased: Date, 
            imagePath,
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
        
        //Delete books file and row from db
        const imagePath = path.join(path.dirname(require.main.filename), bookFound.imagePath);

        Book.destroy({where: {id: bookFound.id}}).then( () =>{
            res.status(200).redirect('/book');

            //Delete book
            return fs.unlink(imagePath, (error) => {
                if (error) {
                    console.error(error);
                }
            });
            
        });

    }).catch(err => {
        console.log(err);
        return res.status(500).redirect('/book');
    });
};