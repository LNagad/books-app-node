const express = require('express');
const publisherController = require('../controllers/PublisherController');

const router = express.Router();

router.get('/publisher', publisherController.getPublisherPage);

router.get('/create-publisher', publisherController.getCreate);
router.post('/create-publisher', publisherController.postCreate);

router.get('/edit-publisher/:Id', publisherController.getEdit);
router.post('/edit-publisher', publisherController.postEdit);

router.get('/delete-publisher/:Id', publisherController.Delete);



module.exports = router;