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
    console.log('query', req.query);
    console.log('params', req.params);

    const userId = req.params.userId;
    const explore = req.query.q;

    switch (explore.toLocaleLowerCase()) {
        case 'Tweets':
        case 'tweets':
            const tweets = await Post.aggregate([{ $match: { $or: [{}, {}, {}] } }]);
            return res
                .status(200)
                .json(new ApiResponse(200, { posts: [] }, 'bookmarked fetched...'));
        case 'TweetsAndReplies':
        case 'tweetsAndReplies':
            return res
                .status(200)
                .json(new ApiResponse(200, { posts: [] }, 'bookmarked fetched...'));
        case 'Media':
        case 'media':
            return res
                .status(200)
                .json(new ApiResponse(200, { posts: [] }, 'bookmarked fetched...'));
        case 'Likes':
        case 'likes':
            return res
                .status(200)
                .json(new ApiResponse(200, { posts: [] }, 'bookmarked fetched...'));
        default:
            return res
                .status(200)
                .json(new ApiResponse(200, { posts: [] }, 'bookmarked fetched...'));
    }
};

module.exports = {
    getBookmarkFn,
};
