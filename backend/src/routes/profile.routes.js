const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserSuggestion,
    getMySocialProfile,
    updateSocialProfile,
    getProfileByUserId,
    followUnfollowUser,
    getProfileFollowersList,
    getProfileFollowingList,
} = require('../controllers/profile.controller');
const { checkAuth } = require('../middleware/checkAuth');

router.use(checkAuth);

// base = /api/v1/profile/

router.route('/users').get(getUsers);

router.route('/users/suggestion').get(getUserSuggestion);

router.route('/current/me').get(getMySocialProfile).patch(updateSocialProfile);

router.route('/:userId/followers/list').get(getProfileFollowersList);

router.route('/:userId/following/list').get(getProfileFollowingList);

router.route('/:userId').get(getProfileByUserId);

router.route('/:userId/follow').patch(followUnfollowUser);

module.exports = router;
