const {DataTypes}  = require('sequelize');
const sequelize = require('../util/database');

const Book = sequelize.define('Books', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    yearReleased: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagePath: {
        type: DataTypes.STRING,
        allowNull: false
    },
});


module.exports = Book;