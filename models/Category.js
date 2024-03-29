const {DataTypes}  = require('sequelize');
const sequelize = require('../util/database');

const Category = sequelize.define('Categories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
});


module.exports = Category;