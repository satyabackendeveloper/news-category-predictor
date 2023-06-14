const { validate } = require('express-validation');

const vOptions = { keyByField: true };
const joiOptions = { abortEarly: false, allowUnknown: true };

const shopdotValidate = (schema) => validate(schema, vOptions, joiOptions);

module.exports = shopdotValidate;
