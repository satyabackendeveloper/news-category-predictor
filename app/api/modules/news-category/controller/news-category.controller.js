const BaseController = require("../../../common/controllers/base.controller");
const newsCategoryRepository = require("../repository/news-category.repository");
const responseService = require("../../../common/services/response.service");

class NewsCategoryController {
    constructor(repository, responseService) {
        this.repository = repository;
        this.responseService = responseService;
        this.scrape = this.scrape.bind(this);
    }

    async scrape(req, res) {
        try {
            const record = await this.repository.scrape(req.body);
            this.responseService.created(req, res, record, 'Prediction completed successfully');
        } catch (e) {
            this.responseService.fail(req, res, e);
        }
    }
}

module.exports = new NewsCategoryController(newsCategoryRepository, responseService);
