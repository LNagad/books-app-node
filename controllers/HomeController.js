const Book = require('../models/Book');
const Category = require('../models/Category');


exports.getHome = async (req, res) => {

    const categories = await Category.findAll({raw: true});

    Book.findAll({raw: true}).then(result => {
        res.status(200).render('home', {
            pageName: 'Home',
            books: result,
            hasBook: result.length > 0,
            categories
        });

    }).catch(err => {
        console.log(err);
    });
};


exports.bookFind = (req, res) => {
    const bookName = req.body.bookName;
    if (!bookName) {
        return res.redirect('/');
    }

    Book.findAll({where: {title: bookName}}).then(result => {   
        res.status(200).render('home', {
            pageName: 'Home',
            books: result.map(p => p.dataValues),
            hasBook: result.length > 0
        });

    }).catch(err => {
        console.log(err);
    });

};

exports.filterBooks = async (req, res) => {
    
    const categoriesSelected = req.body.categoryFilter;
    const bookList = [];
    
    if (categoriesSelected.length < 2) {
      
        const list = await Book.findAll( {raw: true, where: {CategoryId: categoriesSelected}} );
       
        list.forEach(e => bookList.push(e) );

    } else {

        for (const id of categoriesSelected) {
                
            const list = await Book.findAll({
                raw: true,
                where: {CategoryId: id}
            });

            list.forEach(e => bookList.push(e) );
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