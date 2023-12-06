const User = require('../models/user.model');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const { default: mongoose } = require('mongoose');

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getBookmarkFn = async (req, res) => {
    const userId = req.params.userId;
    const explore = req.query.bookmark;
    res.status(200).json(new ApiResponse(200, {}, 'bookmarked fetched...'));
};

module.exports = {
    getBookmarkFn,
};
