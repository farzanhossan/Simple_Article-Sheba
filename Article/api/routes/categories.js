const express = require('express');
const router = express.Router();
const categoryController = require('./controllers/categoryController');

router.get('/',categoryController.categoryGet);
router.post('/create',categoryController.categoryCreate);
router.put('/update/:category_id',categoryController.categoryUpdate);
router.delete('/delete/:category_id',categoryController.categoryDelete);
router.get('/search/:category_name',categoryController.categoryArticleSearch);

module.exports = router;