const ApiError = require('../utils/ApiError');
const { verifyToken } = require('../utils/authUtils');
const User = require('../models/user.model');
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

const checkAuth = async (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        next(new ApiError(401, 'Unauthorized.'));
    }
    try {
        const decoded = verifyToken(token);
        const { _id } = decoded;
        const user = await User.findById(_id);
        user.password = undefined;
        user.__v = undefined;
        req.user = user;
        next();
    } catch (error) {
        console.log('TOKEN_ERROR: ', error.message);
        next(new ApiError(401, error?.message || 'Unauthorized.'));
    }
};

module.exports = {
    checkAuth,
};
