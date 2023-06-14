const express = require("express");
const router = express.Router();
const newsCategoryValidate = require("../../../../middleware/validate.middleware");
const newsCategoryValidation = require("../middleware/news-category.validation");

router.route('/').post(newsCategoryValidate(newsCategoryValidation.scrape), newsCategoryController.scrape);

module.exports = router;
