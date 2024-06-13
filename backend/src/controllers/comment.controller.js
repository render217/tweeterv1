const User = require('../models/user.model');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');

const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const { default: mongoose, isValidObjectId } = require('mongoose');

/**
 * @param {import("express").Request} req
 * @returns {mongoose.PipelineStage[]}
 */
const commentCommonAggregation = (req) => {
    const userId = req.user._id;
    return [
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
                    $cond: [{ $in: [userId, '$likes'] }, true, false],
                },
            },
        },
        {
            $set: {
                isAuthor: {
                    $cond: [{ $eq: [userId, '$author._id'] }, true, false],
                },
            },
        },
    ];
};
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getPostComments = async (req, res) => {
    const userId = req.user._id;
    const { postId } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const total = await Comment.findOne({ post: postId }).countDocuments();
    console.log({ total: total }, 'comentens');
    const pages = Math.ceil(total / limit);

    if (page > pages) {
        return res.status(200).json(new ApiResponse(200, { comments: [] }));
    }

    isValidMongooseId(postId);

    const result = await Comment.aggregate([
        { $match: { post: { $eq: mongooseId(postId) } } },
        ...commentCommonAggregation(req),
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
    ]);

    res.status(200).json(new ApiResponse(200, { comments: result }));
};
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const addComment = async (req, res) => {
    const userId = req.user._id;
    const { postId } = req.params;
    isValidMongooseId(postId);

    const { content } = req.body;
    console.log('comment payload..', req.body);

    if (!content) {
        throw new ApiError(400, 'comment content is required');
    }
    const newComment = await Comment.create({
        author: userId,
        content: content,
        post: postId,
    });

    const result = await Comment.aggregate([
        { $match: { _id: { $eq: newComment._id } } },
        ...commentCommonAggregation(req),
    ]);

    const payload = result[0];
    res.status(200).json(new ApiResponse(200, { comment: payload }, 'successfully commented'));
};
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const likeDislikeComment = async (req, res) => {
    const userId = req.user._id;
    const { postId, commentId } = req.params;
    isValidMongooseId(postId);
    isValidMongooseId(commentId);

    const comment = await Comment.findOne({
        post: postId,
        _id: commentId,
    });
    console.log(commentId);
    const isLiked = comment.likes.find((id) => id.toString() === userId.toString());
    if (isLiked === undefined) {
        comment.likes = [...comment.likes, userId];
    } else {
        comment.likes = comment.likes.filter((id) => id.toString() !== userId.toString());
    }
    await comment.save();

    res.status(200).json(
        new ApiResponse(
            200,
            { comment },
            `successfully ${isLiked === undefined ? 'Liked' : 'UnLiked'} comment`
        )
    );
};
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const deleteComment = async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const userId = req.user._id;

    isValidMongooseId(postId);
    isValidMongooseId(commentId);

    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "comment doesn't exist");
    }
    const isAdmin = comment.author.toString() === userId.toString();
    if (!isAdmin) {
        throw new ApiError(401, "you can't delete the comment (not author)");
    }

    const result = await Comment.deleteOne({ _id: commentId });
    res.status(200).json(new ApiResponse(200, { comment }, 'successfully deleted comment'));
};

// const updateComment = async (req, res) => {};
module.exports = {
    getPostComments,
    addComment,
    likeDislikeComment,
    deleteComment,
    // updateComment,
};

const isValidMongooseId = (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, 'Invalid ID');
    }
};

const mongooseId = (id) => {
    return new mongoose.Types.ObjectId(id);
};
