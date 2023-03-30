const Book = require('./Book');
const Publisher = require('./Publisher');
const Author = require('./Author');
const Category = require('./Category');



Book.belongsTo(Author, {constraints: false, foreignKey: 'AuthorId',  onDelete: 'CASCADE'});
Book.belongsTo(Category, {constraints: false, foreignKey: 'CategoryId',  onDelete: 'CASCADE'});
Book.belongsTo(Publisher, {constraints: false, foreignKey: 'PublisherId',  onDelete: 'CASCADE'});

Author.hasMany(Book, {constraints: false, foreignKey: 'AuthorId',  onDelete: 'CASCADE'});
Category.hasMany(Book, {constraints: false, foreignKey: 'CategoryId',  onDelete: 'CASCADE'});
Publisher.hasMany(Book, {constraints: false, foreignKey: 'PublisherId',  onDelete: 'CASCADE'});


module.exports = { Book, Publisher, Author, Category };