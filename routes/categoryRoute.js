const express = require('express');
const categoryController = require('../controllers/CategoryController');

const router = express.Router();

router.get('/category', categoryController.getCategoriesPage);
router.get('/create-category', categoryController.getCreate);
router.post('/create-category', categoryController.postCreate);


module.exports = router;