const Joi = require("joi");
const bcrypt = require("bcryptjs");

const scrape = {
    body: Joi.object().keys({
        link: Joi.string().required(),
    }),
};


module.exports = {
    scrape,
};
