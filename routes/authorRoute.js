const express = require('express');
const authorController = require('../controllers/AuthorController');

const router = express.Router();

router.get('/author', authorController.getAuthorPage);

router.get('/create-author', authorController.getCreate);
router.post('/create-author', authorController.postCreate);

router.get('/edit-author/:Id', authorController.getEdit);
router.post('/edit-author', authorController.postEdit);

router.get('/delete-author/:Id', authorController.Delete);



module.exports = router;