const express = require('express');
const router = express.Router();
const articleController = require('./controllers/articleController');

router.get('/',articleController.articleGet);
router.post('/create',articleController.articleCreate);
router.put('/update/:article_id',articleController.articleUpdate);
router.delete('/delete/:article_id',articleController.articleDelete);

module.exports = router;