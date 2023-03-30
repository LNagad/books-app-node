const express = require('express');
const categoryController = require('../controllers/CategoryController');

const router = express.Router();

router.get('/category', categoryController.getCategoriesPage);

router.get('/create-category', categoryController.getCreate);
router.post('/create-category', categoryController.postCreate);

router.get('/edit-category/:Id', categoryController.getEdit);
router.post('/edit-category', categoryController.postEdit);

router.get('/delete-category/:Id', categoryController.Delete);



module.exports = router;