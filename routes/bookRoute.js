const express = require('express');
const bookController = require('../controllers/BookController');

const router = express.Router();

router.get('/book', bookController.getBookPage);

router.get('/create-book', bookController.getCreate);
router.post('/create-book', bookController.postCreate);

router.get('/edit-book/:Id', bookController.getEdit);
router.post('/edit-book', bookController.postEdit);

router.get('/delete-book/:Id', bookController.Delete);



module.exports = router;