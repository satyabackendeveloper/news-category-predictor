const models = require("../../../common/models");
const ono = require("@jsdevtools/ono");
const axios = require("axios");

const {
  NewsCategory,
} = models;

class NewsCategoryRepository {
  constructor(model) {
    this.model = model;
    this.scrape = this.scrape.bind(this);

  }

  async scrape(scrapeDto) {
  }
}

module.exports = new NewsCategoryRepository(NewsCategory);
