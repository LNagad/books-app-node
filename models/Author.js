const {DataTypes}  = require('sequelize');
const sequelize = require('../util/database');

const Author = sequelize.define('Authors', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
});


module.exports = Author;