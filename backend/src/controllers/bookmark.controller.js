const User = require('../models/user.model');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const { default: mongoose } = require('mongoose');
const { postCommonAggregation } = require('./common');

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

    switch (explore) {
        /**
         *
         *
         *
         */
        case 'Tweets':
        case 'tweets':
            const tweets = await Post.aggregate([
                {
                    $match: {
                        $or: [
                            { author: { $eq: mongooseId(userId) } },
                            { bookmark: { $in: [mongooseId(userId), '$bookmark'] } },
                            { retweet: { $in: [mongooseId(userId), '$retweet'] } },
                        ],
                    },
                },
                ...postCommonAggregation(req),
                { $sort: { createdAt: -1 } },
            ]);
            return res.status(200).json(new ApiResponse(200, { posts: tweets }));

        /**
         *
         *
         *
         */
        case 'TweetsAndReplies':
        case 'tweetsAndReplies':
            const tweetsandReplies = await Comment.aggregate([
                {
                    $match: {
                        $or: [
                            { author: { $eq: mongooseId(userId) } },
                            { likes: { $in: [mongooseId(userId), '$likes'] } },
                        ],
                    },
                },
                { $project: { post: 1, _id: 0 } },
                {
                    $lookup: {
                        from: 'posts',
                        localField: 'post',
                        foreignField: '_id',
                        as: 'post',
                        pipeline: [...postCommonAggregation(req)],
                    },
                },
                { $set: { post: { $first: '$post' } } },
                { $group: { _id: null, posts: { $push: '$post' } } },
                { $unset: ['_id'] },
                { $sort: { createdAt: -1 } },
            ]);

            return res
                .status(200)
                .json(new ApiResponse(200, { posts: tweetsandReplies[0]?.posts ?? [] }));
        /**
         *
         *
         *
         */
        case 'Media':
        case 'media':
            const mediaTweets = await Post.aggregate([
                {
                    $match: {
                        $or: [
                            { author: { $eq: mongooseId(userId) } },
                            { bookmark: { $in: [mongooseId(userId), '$bookmark'] } },
                            { retweet: { $in: [mongooseId(userId), '$retweet'] } },
                        ],
                    },
                },
                { $match: { imageUrl: { $ne: null } } },
                ...postCommonAggregation(req),
                { $sort: { createdAt: -1 } },
            ]);
            return res.status(200).json(new ApiResponse(200, { posts: mediaTweets }));
        /**
         *
         *
         *
         */
        case 'Likes':
        case 'likes':
            const likedTweets = await Post.aggregate([
                { $match: { likes: { $in: [mongooseId(userId), '$likes'] } } },
                ...postCommonAggregation(req),
                { $sort: { createdAt: -1 } },
            ]);
            return res.status(200).json(new ApiResponse(200, { posts: likedTweets }));
        default:
            const defaultTweets = await Post.aggregate([
                {
                    $match: {
                        $or: [
                            { author: { $eq: mongooseId(userId) } },
                            { bookmark: { $in: [mongooseId(userId), '$bookmark'] } },
                            { retweet: { $in: [mongooseId(userId), '$retweet'] } },
                        ],
                    },
                },
                ...postCommonAggregation(req),
                { $sort: { createdAt: -1 } },
            ]);
            return res.status(200).json(new ApiResponse(200, { posts: defaultTweets }));
    }
};

module.exports = {
    getBookmarkFn,
};

const mongooseId = (id) => new mongoose.Types.ObjectId(id);
