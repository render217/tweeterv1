const express = require('express');
const router = express.Router();
const { getBookmarkFn } = require('../controllers/bookmark.controller');
const { checkAuth } = require('../middleware/checkAuth');

//
router.use(checkAuth);
// base = /api/v1/bookmark

router.route('/').get(getBookmarkFn);

module.exports = router;
