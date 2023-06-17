const newsCategoryRepository = require("../respository/news-category.repository");
const responseService = require("../../../common/services/response.service");

class NewsCategoryController {
    constructor(repository, responseService) {
        this.repository = repository;
        this.responseService = responseService;
        this.scrape = this.scrape.bind(this);
        this.getNewsCategories = this.getNewsCategories.bind(this);
    }

    async scrape(req, res) {
        try {
            const record = await this.repository.scrape(req.body);
            this.responseService.created(req, res, record, 'Prediction completed successfully');
        } catch (e) {
            this.responseService.fail(req, res, e);
        }
    }

    async getNewsCategories(req, res) {
        try {
            const record = await this.repository.getNewsCategories(req.body);
            this.responseService.success(req, res, record, 'List fetched successfully');
        } catch (e) {
            this.responseService.fail(req, res, e);
        }
    }
}

module.exports = new NewsCategoryController(newsCategoryRepository, responseService);
