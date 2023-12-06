const User = require("../models/user.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const { default: mongoose, isValidObjectId } = require("mongoose");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getPostComments = async (req, res) => {
    const userId = req.user._id;
    const { postId } = req.params;

    isValidMongooseId(postId);

    const result = await Comment.aggregate([
        {
            $match: { post: { $eq: mongooseId(postId) } },
        },
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author",
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
                author: { $first: "$author" },
                isLiked: {
                    $cond: [{ $in: [userId, "$likes"] }, true, false],
                },
            },
        },
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
    console.log(req.body);
    if (!content) {
        throw new ApiError(400, "comment content is required");
    }
    const newComment = await Comment.create({
        author: userId,
        content: content,
        post: postId,
    });
    const result = await Comment.aggregate([
        {
            $match: {
                post: { $eq: mongooseId(postId) },
                _id: { $eq: newComment._id },
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author",
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
                author: { $first: "$author" },
            },
        },
    ]);
    const payload = result[0];
    res.status(200).json(
        new ApiResponse(200, { comment: payload }, "successfully commented")
    );
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
    const isLiked = comment.likes.find(
        (id) => id.toString() === userId.toString()
    );
    if (isLiked === undefined) {
        comment.likes = [...comment.likes, userId];
    } else {
        comment.likes = comment.likes.filter(
            (id) => id.toString() !== userId.toString()
        );
    }
    await comment.save();

    res.status(200).json(
        new ApiResponse(
            200,
            { comment },
            `successfully ${
                isLiked === undefined ? "Liked" : "UnLiked"
            } comment`
        )
    );
};

// const deleteComment = async (req, res) => {};
// const updateComment = async (req, res) => {};

module.exports = {
    getPostComments,
    addComment,
    likeDislikeComment,
    // deleteComment,
    // updateComment,
};

const isValidMongooseId = (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid ID");
    }
};

const mongooseId = (id) => {
    return new mongoose.Types.ObjectId(id);
};
