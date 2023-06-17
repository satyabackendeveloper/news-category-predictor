const express = require("express");
const router = express.Router();
const newsCategoryValidate = require("../../../../middleware/validate.middleware");
const newsCategoryValidation = require("../middleware/news-category.validation");
const newsCategoryController = require("../controller/news-category.controller");

router.route('/').post(newsCategoryValidate(newsCategoryValidation.scrape), newsCategoryController.scrape);
router.route('/list').post(newsCategoryController.getNewsCategories);

module.exports = router;
