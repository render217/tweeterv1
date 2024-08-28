require('dotenv').config({ path: './src/config/.env' });
const { MongooseError } = require('mongoose');
const ApiError = require('../utils/ApiError');
/**
 * @param {Error || ApiError || import("mongoose").MongooseError} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * */
const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        const statusCode = error?.statusCode || error instanceof MongooseError ? 400 : 500;
        const message = error?.message || 'Something went wrong';

        error = new ApiError(statusCode, message, error?.errors || [], error?.stack);
    }

    const errStack = process.env.NODE_ENV === 'production' ? {} : { stack: error.stack };

    const response = {
        ...error,
        ...errStack,
    };
    console.log('ERROR: ', response);
    res.status(error.statusCode).json(response);
};
module.exports = errorHandler;
