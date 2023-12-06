const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
        },
        imageUrl: {
            type: String,
            default: null,
        },
        imagePublicId: {
            type: String,
            default: null,
        },
        tags: {
            type: [String],
            default: [],
        },
        audience: {
            type: String,
            enum: ['everyone', 'following'],
            default: 'everyone',
        },
        author: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        comments: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Comment',
            },
        ],
        likes: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
        bookmark: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
        retweet: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model('post', postSchema);
module.exports = userModel;
