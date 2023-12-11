const express = require('express');
const router = express.Router();
const {
    addComment,
    getPostComments,
    likeDislikeComment,
    deleteComment,
    // updateComment,
} = require('../controllers/comment.controller');
const { checkAuth } = require('../middleware/checkAuth');

//
router.use(checkAuth);
// base = /api/v1/comment/

router.route('/:postId').get(getPostComments).post(addComment);
router.route('/:postId/like/:commentId').patch(likeDislikeComment);
router.route('/:postId/delete/:commentId').delete(deleteComment);
// router.route("/:postId/update/:commentId").patch(updateComment);

module.exports = router;
