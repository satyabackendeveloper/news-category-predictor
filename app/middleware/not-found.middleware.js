const responseService = require('../api/common/services/response.service.js');

module.exports = (req, res, next) => {
    responseService.pathNotFound(req, res);
    next();
};
