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

const getExploreFn = async (req, res) => {
    console.log(req.query);
    const userId = req.user._id;
    const explore = req.query.q;
    const search = req.query.search || '';
    const tag = req.query?.tag;
    switch (explore) {
        /**
         *
         *
         *
         */
        case 'Top':
        case 'top':
            const topResult = await Post.aggregate([
                {
                    $match: {
                        $or: [
                            { content: { $regex: search, $options: 'i' } },
                            { tags: { $in: [search, '$tags'] } },
                        ],
                    },
                },
                ...postCommonAggregation(req),
                { $set: { noOfLikes: { $size: '$likes' } } },
                { $sort: { noOfLikes: -1 } },
                { $unset: ['noOfLikes'] },
            ]);
            return res
                .status(200)
                .json(new ApiResponse(200, { posts: topResult }, 'top liked posts fetched'));
        /**
         *
         *
         *
         */
        case 'Latest':
        case 'latest':
            /**
             *  @returns {mongoose.PipelineStage[]}
             * */
            const tagPipeline = () => {
                if (tag) return [{ $match: { tags: { $in: [tag, '$tags'] } } }];
                return [{ $unset: ['justtomakeitunempty'] }];
            };
            const latestResult = await Post.aggregate([
                {
                    $match: {
                        $or: [
                            { content: { $regex: search, $options: 'i' } },
                            { tags: { $in: [search, '$tags'] } },
                        ],
                    },
                },
                ...tagPipeline(),
                ...postCommonAggregation(req),
                { $sort: { createdAt: -1 } },
            ]);
            return res.status(200).json(new ApiResponse(200, { posts: latestResult }));
        /**
         *
         *
         *
         */
        case 'People':
        case 'people':
            const allPeople = await User.aggregate([
                { $match: { _id: { $ne: userId } } },
                { $match: { username: { $regex: search, options: 'i' } } },
                {
                    $set: {
                        isFollowed: {
                            $cond: [{ $in: [userId, '$followers'] }, true, false],
                        },
                    },
                },
                {
                    $unset: [
                        'password',
                        'coverImagePublicId',
                        'profileImagePublicId',
                        'following',
                        '__v',
                    ],
                },
            ]);
            return res.status(200).json(new ApiResponse(200, { people: allPeople }));
        /**
         *
         *
         *
         */
        case 'Media':
        case 'media':
            const mediaResult = await Post.aggregate([
                { $match: { imageUrl: { $ne: null } } },
                {
                    $match: {
                        $or: [
                            { content: { $regex: search, $options: 'i' } },
                            { tags: { $in: [search, '$tags'] } },
                        ],
                    },
                },
                ...postCommonAggregation(req),
                { $sort: { createdAt: -1 } },
            ]);
            return res.status(200).json(new ApiResponse(200, { posts: mediaResult }));

        default:
            const defaultResult = await Post.aggregate([
                ...postCommonAggregation(req),
                { $sort: { createdAt: -1 } },
            ]);
            return res.status(200).json(new ApiResponse(200, { posts: defaultResult }));
    }
};

module.exports = {
    getExploreFn,
};
