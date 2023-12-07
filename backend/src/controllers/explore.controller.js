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
const getExploreFn = async (req, res) => {
    console.log(req.query);
    const userId = req.user._id;
    const explore = req.query.q;
    const search = req.query.search;
    switch (explore) {
        case 'Top':
        case 'top':
            const topResult = await Post.aggregate([
                {
                    $match: {
                        content: { $regex: search, $options: 'i' },
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
                                if: { $in: [userId, '$likes'] },
                                then: true,
                                else: false,
                            },
                        },
                        isRetweeted: {
                            $cond: [{ $in: [userId, '$retweet'] }, true, false],
                        },
                        isBookmarked: {
                            $cond: [{ $in: [userId, '$bookmark'] }, true, false],
                        },
                    },
                },
                {
                    $set: {
                        noOfLikes: { $size: '$likes' },
                    },
                },
                {
                    $sort: { noOfLikes: -1 },
                },
                // {
                //     $unset: ['noOfLikes'],
                // },
            ]);
            return res
                .status(200)
                .json(new ApiResponse(200, { posts: topResult }, 'top liked posts fetched'));
        case 'Latest':
        case 'latest':
            const latestResult = await Post.aggregate([
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
                                if: { $in: [userId, '$likes'] },
                                then: true,
                                else: false,
                            },
                        },
                        isRetweeted: {
                            $cond: [{ $in: [userId, '$retweet'] }, true, false],
                        },
                        isBookmarked: {
                            $cond: [{ $in: [userId, '$bookmark'] }, true, false],
                        },
                    },
                },

                {
                    $sort: { createdAt: -1 },
                },
            ]);
            return res
                .status(200)
                .json(new ApiResponse(200, { posts: latestResult }, 'latest posts fetched'));
        case 'People':
        case 'people':
            const allPeople = await User.aggregate([
                {
                    $match: { _id: { $ne: userId } },
                },
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
            return res
                .status(200)
                .json(new ApiResponse(200, { people: allPeople }, 'avaliable users fetched'));
        case 'Media':
        case 'media':
            const mediaResult = await Post.aggregate([
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
                                if: { $in: [userId, '$likes'] },
                                then: true,
                                else: false,
                            },
                        },
                        isRetweeted: {
                            $cond: [{ $in: [userId, '$retweet'] }, true, false],
                        },
                        isBookmarked: {
                            $cond: [{ $in: [userId, '$bookmark'] }, true, false],
                        },
                    },
                },
                {
                    $sort: { createdAt: -1 },
                },
            ]);
            return res
                .status(200)
                .json(new ApiResponse(200, { posts: mediaResult }, 'media posts fetched'));

        default:
            const defaultResult = await Post.aggregate([
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
                                if: { $in: [userId, '$likes'] },
                                then: true,
                                else: false,
                            },
                        },
                        isRetweeted: {
                            $cond: [{ $in: [userId, '$retweet'] }, true, false],
                        },
                        isBookmarked: {
                            $cond: [{ $in: [userId, '$bookmark'] }, true, false],
                        },
                    },
                },

                {
                    $sort: { createdAt: -1 },
                },
            ]);
            return res
                .status(200)
                .json(
                    new ApiResponse(200, { posts: defaultResult }, 'latest posts fetched (default)')
                );
    }
};

module.exports = {
    getExploreFn,
};
