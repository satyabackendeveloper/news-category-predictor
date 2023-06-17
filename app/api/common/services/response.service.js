const HttpStatus = require('http-status');
const constants = require('./../../../config/constants.config.js');

class ResponseService {
    constructor() {
        this.send = this.send.bind(this);
    }

    async send(req, res, httpStatus, success, code, message, data, errors) {
        const response = { success, code, message };

        if (data) {
            response.data = data;
        }

        if (errors) {
            response.errors = errors;
        }

        res.status(httpStatus).send(response);
    }

    fail(req, res, e) {
        const statusCode = e.status || 500;
        this.send(
            req,
            res,
            statusCode,
            false,
            statusCode,
            HttpStatus[statusCode],
            e.data || null,
            e.errors || e.message
        );
    }

    created(req, res, record, message = null) {
        const resConst = constants.RECORD_CREATED;
        this.send(req, res, HttpStatus.CREATED, true, resConst.CODE, message ? resConst.MESSAGE : null, record);
    }

    updated(req, res, record, message = null) {
        const resConst = constants.RECORD_UPDATED;
        this.send(req, res, HttpStatus.OK, true, resConst.CODE, message ? resConst.MESSAGE : null, record);
    }

    deleted(req, res) {
        const resConst = constants.RECORD_DELETED;
        this.send(req, res, HttpStatus.OK, true, resConst.CODE, resConst.MESSAGE, res.data);
    }

    success(req, res, data, message = null) {
        const resConst = constants.SUCCESS;
        this.send(req, res, HttpStatus.OK, true, resConst.CODE, message ? resConst.MESSAGE : null, data);
    }

    validation(req, res, err) {
        const resConst = constants.VALIDATION;
        this.send(req, res, HttpStatus.BAD_REQUEST, false, resConst.CODE, resConst.MESSAGE, null, err.details);
    }

    notFound(req, res) {
        const resConst = constants.RECORD_NOT_FOUND;
        this.send(req, res, HttpStatus.NOT_FOUND, false, resConst.CODE, resConst.MESSAGE, res.data);
    }

    pathNotFound(req, res) {
        const resConst = constants.PATH_NOT_FOUND;
        this.send(req, res, HttpStatus.NOT_FOUND, false, resConst.CODE, resConst.MESSAGE);
    }

    unauthorized(req, res) {
        const resConst = constants.UNAUTHORIZED;
        this.send(req, res, HttpStatus.UNAUTHORIZED, false, resConst.CODE, resConst.MESSAGE);
    }

    forbidden(req, res) {
        const resConst = constants.FORBIDDEN;
        this.send(req, res, HttpStatus.FORBIDDEN, false, resConst.CODE, resConst.MESSAGE);
    }
}

module.exports = new ResponseService();
