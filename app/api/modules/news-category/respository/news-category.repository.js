const models = require("../../../common/models");
const ono = require("@jsdevtools/ono");
const axios = require("axios");
const cheerio = require("cheerio");
const { spawn } = require('child_process');
const sys = require('sys');

const {
  NewsCategory,
} = models;

class NewsCategoryRepository {
  constructor(model) {
    this.model = model;
    this.scrape = this.scrape.bind(this);
    this.storeNewsCategory = this.storeNewsCategory.bind(this);
    this.getNewsCategories = this.getNewsCategories.bind(this);

  }

  async scrape(scrapeDto) {
    const axiosResponse = await axios.request({
      method: "GET",
      url: scrapeDto.link,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
      }
    })

    const $ = cheerio.load(axiosResponse.data)
    const heading = $('h1').first().text();

    await this.predictNewsCategory({
      heading,
      url: scrapeDto.link
    });

    // const newsCategoryList = await this.getNewsCategories();
    // return newsCategoryList;
  }

  async predictNewsCategory(scrapeDto) {
    // Store news category data
    await this.storeNewsCategory({
      heading: scrapeDto.heading,
      category: 'Test',
      content: null,
      url: scrapeDto.url
    })

    // const predictNewsCategory = spawn('python3', ['app/newscategorypredictor.py', JSON.parse({
    //   heading: scrapeDto.heading
    // })]);
    // let result;
    // predictNewsCategory.stdout.on('data', (data) => {
    //   result += data.toString();
    // });

    // predictNewsCategory.stderr.on('data', (data) => {
    //   result += data.toString();
    // });

    // predictNewsCategory.on('close', async (code) => {
    //   console.log(result)


    // });
  }

  async storeNewsCategory(categoryData) {
    try {
      const checkDuplicate = await this.model.findOne({
        where: {
          url: categoryData.url
        }
      })
      if (checkDuplicate) {
        await this.model.update(categoryData, {
          where: {
            url: categoryData.url
          }
        });
      } else {
        await this.model.create(categoryData);
      }
    } catch (e) {
      throw ono({
        status: 500,
        message: 'Failed to create category data'
      })
    }
  }

  async getNewsCategories() {
    return await this.model.findAndCountAll({
      order: [
        ['created_at', 'DESC']
      ]
    });
  }
}

module.exports = new NewsCategoryRepository(NewsCategory);
