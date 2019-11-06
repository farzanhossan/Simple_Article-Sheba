const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
let checkAuth = require('../middleware/checkAuth');


router.get('/', checkAuth,articleController.articleGet);
router.post('/create',checkAuth,articleController.articleCreate);
router.put('/update/:article_id',checkAuth,articleController.articleUpdate);
router.delete('/delete/:article_id',checkAuth, articleController.articleDelete);

module.exports = router;