const express = require('express');
const router = express.Router();
const { getExploreFn } = require('../controllers/explore.controller');
const { checkAuth } = require('../middleware/checkAuth');

//
router.use(checkAuth);
// base = /api/v1/explore

router.route('/').get(getExploreFn);

module.exports = router;
