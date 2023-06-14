const express = require("express");
const router = express.Router();
const newCategoryRoutes = require("./modules/news-category/routes/news-category.route");

router.use("/news-category", newCategoryRoutes);

module.exports = router;
