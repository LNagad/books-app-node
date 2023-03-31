const Book = require('../models/Book');
const Category = require('../models/Category');
const Author = require('../models/Author');
const Publisher = require('../models/Publisher');


exports.getHome = async (req, res) => {

    const categories = await Category.findAll({raw: true});

    const ListBooks = await Book.findAll({
        include: [{ model: Category }, { model: Author }, { model: Publisher }],
        raw: true
    });

    const list =  ListBooks.map( (p) => {
        const {id, title, yearReleased, imagePath} = p;
        const author = p['Author.name'];
        const category = p['Category.name'];
        const publisher = p['Publisher.name']; 

        return {id, title, yearReleased, imagePath, author, category, publisher};
    });

    res.status(200).render('home', {
        pageName: 'Home',
        books: list,
        hasBook: list.length > 0,
        categories
    });
    
};


exports.bookFind = async (req, res) => {
    const bookName = req.body.bookName;
    
    if (!bookName) {
        return res.redirect('/');
    }
    const categories = await Category.findAll({raw: true});

    const ListBooks = await Book.findAll({
        include: [{ model: Category }, { model: Author }, { model: Publisher }],
        raw: true,
        where: {title: bookName}
    });

    const list =  ListBooks.map( (p) => {
        const {id, title, yearReleased, imagePath} = p;
        const author = p['Author.name'];
        const category = p['Category.name'];
        const publisher = p['Publisher.name']; 

        return {id, title, yearReleased, imagePath, author, category, publisher};
    });


    res.status(200).render('home', {
        pageName: 'Home',
        books: list,
        hasBook: list.length > 0,
        categories
    });

};

exports.filterBooks = async (req, res) => {
    
    const categoriesSelected = req.body.categoryFilter;
    const bookList = [];

    if (!categoriesSelected) {
        return res.status(400).redirect('/');
    }

    if (categoriesSelected.length < 2) {

        const list = await Book.findAll({
            include: [{ model: Category }, { model: Author }, { model: Publisher }],
            raw: true,
            where: {CategoryId: categoriesSelected}
        });

        const listMapped =  list.map( (p) => {
            const {id, title, yearReleased, imagePath} = p;
            const author = p['Author.name'];
            const category = p['Category.name'];
            const publisher = p['Publisher.name']; 
    
            return {id, title, yearReleased, imagePath, author, category, publisher};
        });

        listMapped.forEach(e => bookList.push(e) );

    } else {

        for (const id of categoriesSelected) {
            
            const list = await Book.findAll({
                include: [{ model: Category }, { model: Author }, { model: Publisher }],
                raw: true,
                where: {CategoryId: id}
            });  

            const listMapped =  list.map( (p) => {
                const {id, title, yearReleased, imagePath} = p;
                const author = p['Author.name'];
                const category = p['Category.name'];
                const publisher = p['Publisher.name']; 
        
                return {id, title, yearReleased, imagePath, author, category, publisher};
            });

            listMapped.forEach(e => bookList.push(e) );
        }
    }
    const categories = await Category.findAll({raw: true});

    res.status(200).render('home', {
        pageName: 'Home',
        books: bookList,
        hasBook: bookList.length > 0,
        categories
    });
};