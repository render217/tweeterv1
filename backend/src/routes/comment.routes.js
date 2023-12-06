const express = require("express");
const router = express.Router();
const {
    addComment,
    getPostComments,
    likeDislikeComment,
    // updateComment,
    // deleteComment,
} = require("../controllers/comment.controller");
const { checkAuth } = require("../middleware/checkAuth");

//
router.use(checkAuth);
// base = /api/v1/comment/

router.route("/:postId").get(getPostComments).post(addComment);
// .delete(deleteComment);
router.route("/:postId/like/:commentId").patch(likeDislikeComment);
// router.route("/:postId/update/:commentId").patch(updateComment);

module.exports = router;
