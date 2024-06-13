const express = require('express');
const router = express.Router();
const {
    bookmarkUnBookmarkPost,
    likeDislikePost,
    retweetDetweetPost,
    createPost,
    getPosts,
    getAllTags,

    // deletePost,
    // updatePost,

    // getPostsById,
    // getPostsByTag,
} = require('../controllers/post.controller');
const { checkAuth } = require('../middleware/checkAuth');

//
router.use(checkAuth);
// base = /api/v1/post/

router.route('/').post(createPost).get(getPosts); // fdone | filtering remaining
// router.route('/:postId').patch(updatePost).delete(deletePost)
router.route('/like/:postId').patch(likeDislikePost); // done
router.route('/retweet/:postId').patch(retweetDetweetPost); // done
router.route('/bookmark/:postId').patch(bookmarkUnBookmarkPost); // done

router.route('/tags').get(getAllTags);

// router.route("/tags/:tag").get(getPostsByTag);
// router.route("/:postId").get(getPostsById);

module.exports = router;
