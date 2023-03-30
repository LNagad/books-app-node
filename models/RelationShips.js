const Book = require('./Book');
const Publisher = require('./Publisher');
const Author = require('./Author');
const Category = require('./Category');


const RelationShips = () => {
    
    Book.belongsTo(Author, {constraints: true, onDelete: 'CASCADE'});
    Book.belongsTo(Category, {constraints: true, onDelete: 'CASCADE'});
    Book.belongsTo(Publisher, {constraints: true, onDelete: 'CASCADE'});

    Author.hasMany(Book, {constraints: true, onDelete: 'CASCADE'});
    Category.hasMany(Book, {constraints: true, onDelete: 'CASCADE'});
    Publisher.hasMany(Book, {constraints: true, onDelete: 'CASCADE'});

};



module.exports = RelationShips;