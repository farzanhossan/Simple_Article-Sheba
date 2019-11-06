const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
let checkAuth = require('../middleware/checkAuth');

router.get('/',checkAuth,categoryController.categoryGet);
router.post('/create', checkAuth, categoryController.categoryCreate);
router.put('/update/:category_id',checkAuth, categoryController.categoryUpdate);
router.delete('/delete/:category_id', checkAuth, categoryController.categoryDelete);
router.get('/search/:category_name', checkAuth ,categoryController.categoryArticleSearch);

module.exports = router;