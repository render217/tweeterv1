const User = require('../models/user.model');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const { default: mongoose } = require('mongoose');
const fs = require('node:fs');
const MulterUpload = require('../middleware/multer');
const multer = require('multer');
const { uploadToCloudinary } = require('../utils/cloudinaryUtils');
const { postCommonAggregation } = require('./common');

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const createPost = async (req, res) => {
    const userId = req.user._id;
    MulterUpload.single('image')(req, res, async (err) => {
        const { content, tags, audience } = req.body;
        console.log('POST PAYLOAD >>> ', req.body);
        if (!content) {
            return res
                .status(400)
                .json({ statusCode: 400, message: 'Content is Required', errors: [] });
        }
        if (err instanceof multer.MulterError) {
            switch (err.code) {
                case 'LIMIT_UNEXPECTED_FILE':
                    console.log("didn't recieved file named image but it's ok");
                    break;
                case 'LIMIT_FILE_SIZE':
                    return res.status(400).json(new ApiError(400, 'File too large'));
                default:
                    break;
            }
        } else if (err) {
            console.log(err);
            return res.status(500).json(new ApiError(500, err?.message || 'Something went wrong'));
        }

        const newPost = await Post.create({
            content: content,
            audience: audience,
            author: userId,
            tags: tags?.length > 0 ? [...tags.split(',')] : [],
        });
        const image = req.file;
        if (image) {
            console.log('IMAGE PAYLOAD >>>> ', image);
            try {
                const uploadResponse = await uploadToCloudinary(image.path, 'tweeter');
                newPost.imageUrl = uploadResponse.secure_url;
                newPost.imagePublicId = uploadResponse.public_id;
                fs.unlinkSync(image.path);
                console.log('image uploaded to cloudinary');
            } catch (error) {
                console.log('Error uploading to cloudinary');
                return res.status(400).json(new ApiError(400, error?.message || 'Upload failed'));
            }
        }
        await newPost.save();

        const result = await Post.aggregate([
            { $match: { _id: newPost._id } },
            ...postCommonAggregation(req),
        ]);
        res.status(201).json(new ApiResponse(200, { post: result[0] }, 'successfully tweeted'));
    });
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
// saves image on /images...
const createPost2 = async (req, res) => {
    const userId = req.user._id;
    MulterUpload.single('image')(req, res, async (err) => {
        const { content, tags, audience } = req.body;
        console.log('POST PAYLOAD >>> ', req.body);
        if (!content) {
            return res
                .status(400)
                .json({ statusCode: 400, message: 'Content is Required', errors: [] });
        }
        if (err instanceof multer.MulterError) {
            switch (err.code) {
                case 'LIMIT_UNEXPECTED_FILE':
                    console.log("didn't recieved file named image but it's ok");
                    break;
                case 'LIMIT_FILE_SIZE':
                    return res.status(400).json(new ApiError(400, 'File too large'));
                default:
                    break;
            }
        } else if (err) {
            console.log(err);
            return res.status(500).json(new ApiError(500, err?.message || 'Something went wrong'));
        }

        const newPost = await Post.create({
            content: content,
            audience: audience,
            author: userId,
            tags: tags?.length > 0 ? [...tags.split(',')] : [],
        });
        const image = req.file;
        if (image) {
            console.log('IMAGE PAYLOAD >>>> ', image);
            newPost.imageUrl = image.filename;
        }
        await newPost.save();

        const result = await Post.aggregate([
            { $match: { _id: newPost._id } },
            ...postCommonAggregation(req),
        ]);
        const payload = result[0];
        res.status(201).json(new ApiResponse(200, { post: payload }, 'successfully tweeted'));
    });
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const likeDislikePost = async (req, res) => {
    const userId = req.user._id;

    const { postId } = req.params;

    isValidMongooseId(postId);

    const post = await Post.findById(postId);

    const likeIndex = post.likes.findIndex((id) => id.toString() === userId.toString());

    if (likeIndex === -1) {
        const updatedLikes = [...post.likes, userId];
        post.likes = updatedLikes;
        await post.save();
    } else {
        const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());
        post.likes = updatedLikes;
        await post.save();
    }

    res.status(200).json(
        new ApiResponse(
            200,
            { post },
            `successfully ${likeIndex === -1 ? 'liked' : 'unliked'} post.`
        )
    );
};
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const bookmarkUnBookmarkPost = async (req, res) => {
    const userId = req.user._id;

    const { postId } = req.params;

    isValidMongooseId(postId);

    const post = await Post.findById(postId);

    const isBookmarked = post.bookmark.find((id) => id.toString() === userId.toString());

    if (isBookmarked === undefined) {
        post.bookmark = [...post.bookmark, userId];
    } else {
        post.bookmark = post.bookmark.filter((id) => id.toString() !== userId.toString());
    }

    await post.save();

    res.status(200).json(
        new ApiResponse(
            200,
            { post },
            `successfully ${isBookmarked === undefined ? 'bookmarked' : 'unbookmarked'}`
        )
    );
};
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

const retweetDetweetPost = async (req, res) => {
    const userId = req.user._id;

    const { postId } = req.params;

    isValidMongooseId(postId);

    const post = await Post.findById(postId);

    const isRetweeted = post.retweet.find((id) => id.toString() === userId.toString());

    if (isRetweeted === undefined) {
        post.retweet = [...post.retweet, userId];

        await post.save();
    } else {
        post.retweet = post.retweet.filter((id) => id.toString() !== userId.toString());

        await post.save();
    }

    res.status(200).json(
        new ApiResponse(
            200,
            { post },
            `successfully ${isRetweeted === undefined ? 'retweeted' : 'detweeted'} `
        )
    );
};
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 *
 */
const getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Post.countDocuments();

    const pages = Math.ceil(total / limit);

    if (page > pages) {
        return res
            .status(200)
            .json(new ApiResponse(200, { posts: [] }, 'successfully fetched all tweets'));
    }

    const result = await Post.aggregate([
        ...postCommonAggregation(req),
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
    ]);
    res.status(200).json(
        new ApiResponse(200, { posts: result }, 'successfully fetched all tweets')
    );
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

const getAllTags = async (req, res) => {
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 8;
    // const skip = (page - 1) * limit;

    const result = await Post.aggregate([
        { $unwind: '$tags' },
        { $group: { _id: '$tags', count: { $sum: 1 }, posts: { $push: '$_id' } } },
        { $set: { tag: '$_id' } },
        { $unset: ['_id'] },
        { $sort: { count: -1 } },
    ]);

    res.status(200).json(new ApiResponse(200, { tags: result }, 'successfully fetched all tags'));
};

// const updatePost = async (req, res) => {};
// const deletePost = async (req, res) => {};

// const getPostsById = async (req, res) => {};
// const getPostsByTag = async (req, res) => {};

module.exports = {
    createPost,
    likeDislikePost,
    bookmarkUnBookmarkPost,
    retweetDetweetPost,
    getAllTags,
    getPosts,

    // deletePost,
    // updatePost,

    // getPostsById,
    // getPostsByTag,
};

const isValidMongooseId = (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, 'Invalid ID');
    }
};

const monooseId = (id) => new mongoose.Types.ObjectId(id);
