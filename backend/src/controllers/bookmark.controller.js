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
    const authUserId = req.user._id;
    console.log('query', req.query);
    console.log('params', req.params);

    const userId = req.params.userId;
    const explore = req.query.q;

    switch (explore) {
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
                {
                    $lookup: {
                        from: 'users',
                        localField: 'author',
                        foreignField: '_id',
                        as: 'author',
                        pipeline: [
                            {
                                $project: {
                                    username: 1,
                                    profileImage: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $set: {
                        author: { $first: '$author' },
                        isLiked: {
                            $cond: {
                                if: { $in: [authUserId, '$likes'] },
                                then: true,
                                else: false,
                            },
                        },
                        isRetweeted: {
                            $cond: [{ $in: [authUserId, '$retweet'] }, true, false],
                        },
                        isBookmarked: {
                            $cond: [{ $in: [authUserId, '$bookmark'] }, true, false],
                        },
                    },
                },
                { $sort: { createdAt: -1 } },
            ]);
            return res
                .status(200)
                .json(new ApiResponse(200, { posts: tweets }, 'tweets fetched...'));
        case 'TweetAndReplies':
        case 'tweetAndReplies':
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
                        pipeline: [
                            {
                                $lookup: {
                                    from: 'users',
                                    localField: 'author',
                                    foreignField: '_id',
                                    as: 'author',
                                    pipeline: [
                                        {
                                            $project: {
                                                username: 1,
                                                profileImage: 1,
                                            },
                                        },
                                    ],
                                },
                            },
                            {
                                $set: {
                                    author: {
                                        $first: '$author',
                                    },
                                    isLiked: {
                                        $cond: {
                                            if: { $in: [authUserId, '$likes'] },
                                            then: true,
                                            else: false,
                                        },
                                    },
                                    isRetweeted: {
                                        $cond: [{ $in: [authUserId, '$retweet'] }, true, false],
                                    },
                                    isBookmarked: {
                                        $cond: [{ $in: [authUserId, '$bookmark'] }, true, false],
                                    },
                                },
                            },
                        ],
                    },
                },
                {
                    $set: {
                        post: { $first: '$post' },
                    },
                },
                {
                    $group: { _id: null, posts: { $push: '$post' } },
                },
                { $unset: ['_id'] },

                { $sort: { createdAt: -1 } },
            ]);

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        { posts: tweetsandReplies[0]?.posts ?? [] },
                        'tweetAndReplies fetched...'
                    )
                );
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
                {
                    $match: {
                        imageUrl: { $ne: null },
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'author',
                        foreignField: '_id',
                        as: 'author',
                        pipeline: [
                            {
                                $project: {
                                    username: 1,
                                    profileImage: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $set: {
                        author: { $first: '$author' },
                        isLiked: {
                            $cond: {
                                if: { $in: [authUserId, '$likes'] },
                                then: true,
                                else: false,
                            },
                        },
                        isRetweeted: {
                            $cond: [{ $in: [authUserId, '$retweet'] }, true, false],
                        },
                        isBookmarked: {
                            $cond: [{ $in: [authUserId, '$bookmark'] }, true, false],
                        },
                    },
                },
                { $sort: { createdAt: -1 } },
            ]);
            return res
                .status(200)
                .json(new ApiResponse(200, { posts: mediaTweets }, 'mediaTweets fetched...'));
        case 'Likes':
        case 'likes':
            const likedTweets = await Post.aggregate([
                { $match: { likes: { $in: [mongooseId(userId), '$likes'] } } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'author',
                        foreignField: '_id',
                        as: 'author',
                        pipeline: [
                            {
                                $project: {
                                    username: 1,
                                    profileImage: 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $set: {
                        author: { $first: '$author' },
                        isLiked: {
                            $cond: {
                                if: { $in: [authUserId, '$likes'] },
                                then: true,
                                else: false,
                            },
                        },
                        isRetweeted: {
                            $cond: [{ $in: [authUserId, '$retweet'] }, true, false],
                        },
                        isBookmarked: {
                            $cond: [{ $in: [authUserId, '$bookmark'] }, true, false],
                        },
                    },
                },
                { $sort: { createdAt: -1 } },
            ]);
            return res
                .status(200)
                .json(new ApiResponse(200, { posts: likedTweets }, 'likes fetched...'));
        default:
            // default is equal to the first switch case 'Tweets' | 'tweets'
            return res
                .status(200)
                .json(new ApiResponse(200, { posts: tweets }, 'defaultTweets fetched...'));
    }
};

module.exports = {
    getBookmarkFn,
};

const mongooseId = (id) => new mongoose.Types.ObjectId(id);
