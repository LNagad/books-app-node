const express = require('express');
const homeController = require('../controllers/HomeController');


const router = express.Router();


router.get('/', homeController.getHome);

router.post('/book-find', homeController.bookFind);
router.post('/filter-books', homeController.filterBooks);

module.exports = router;