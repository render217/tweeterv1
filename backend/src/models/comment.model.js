const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        post: {
            type: mongoose.Types.ObjectId,
            ref: "Post",
        },
        author: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        content: {
            type: String,
        },
        image: {
            type: String,
        },
        likes: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("comment", commentSchema);
module.exports = userModel;
