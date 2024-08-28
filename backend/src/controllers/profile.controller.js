const User = require('../models/user.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const { default: mongoose } = require('mongoose');
const MulterUpload = require('../middleware/multer');
const multer = require('multer');
const fs = require('node:fs');
const { removeFromCloudinary, uploadToCloudinary } = require('../utils/cloudinaryUtils');

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getMySocialProfile = async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
};
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getProfileByUserId = async (req, res) => {
    const authUserId = req.user._id;
    const userId = req.params.userId;

    const isValid = mongoose.isValidObjectId(userId);
    if (!isValid) {
        return res.status(400).json(new ApiError(400, 'Invalid ID'));
    }

    const result = await User.aggregate([
        { $match: { _id: mongooseId(userId) } },
        {
            $set: {
                isFollowed: {
                    $cond: [{ $in: [authUserId, '$followers'] }, true, false],
                },
            },
        },
    ]);
    const payload = result[0];
    return res
        .status(200)
        .json(new ApiResponse(200, { user: payload }, 'Successfully fetched user'));
};
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const updateSocialProfile = async (req, res) => {
    const userId = req.user._id;
    MulterUpload.fields([
        { name: 'coverImage', maxCount: 1 },
        { name: 'profileImage', maxCount: 1 },
    ])(req, res, async (err) => {
        const { bio, username } = req.body;
        console.log('update profile payload', { bio, username });
        console.log('update profile images payload', req.files);
        if (err instanceof multer.MulterError) {
            switch (err.code) {
                case 'LIMIT_UNEXPECTED_FILE':
                    console.log("didn't recieve either coverImage or profileImage");
                    break;
                default:
                    break;
            }
        } else if (err) {
            return res.status(500).json({ statusCode: 500, message: 'Server Error' });
        }
        const profile = await User.findById(userId);
        if (bio) profile.bio = bio;
        if (username) profile.username = username;

        const uploadPromises = [];

        const profileImagePromise = new Promise(async (resolve) => {
            const profileImage = req.files?.profileImage && req.files?.profileImage[0];
            if (profileImage) {
                if (profile.profileImagePublicId) {
                    const response = await removeFromCloudinary(
                        profile.profileImagePublicId,
                        'tweeter/profile'
                    );
                    console.log('profileImage deleted ❌', response);
                }
                const uploadResponse = await uploadToCloudinary(
                    profileImage.path,
                    'tweeter/profile'
                );
                profile.profileImage = uploadResponse.secure_url;
                profile.profileImagePublicId = uploadResponse.public_id;
                console.log('profileImage uploaded  ✅');
                fs.unlinkSync(profileImage.path);
            }
            resolve();
        });

        const coverImagePromise = new Promise(async (resolve) => {
            const coverImage = req.files?.coverImage && req.files?.coverImage[0];

            if (coverImage) {
                if (profile.coverImagePublicId) {
                    const response = await removeFromCloudinary(
                        profile.coverImagePublicId,
                        'tweeter/profile/cover'
                    );
                    console.log('coverImage deleted ❌', response);
                }
                const uploadResponse = await uploadToCloudinary(
                    coverImage.path,
                    'tweeter/profile/cover'
                );
                profile.coverImage = uploadResponse.secure_url;
                profile.coverImagePublicId = uploadResponse.public_id;
                console.log('coverImage uploaded  ✅');
                fs.unlinkSync(coverImage.path);
            }
            resolve();
        });
        uploadPromises.push(profileImagePromise);
        uploadPromises.push(coverImagePromise);

        await Promise.all(uploadPromises).catch((err) => {
            return res.status(400).json({ message: err.message || 'Internal server error' });
        });
        await profile.save();
        return res
            .status(200)
            .json(new ApiResponse(200, { user: profile }, 'successfully updated'));
    });
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const updateSocialProfile2 = async (req, res) => {
    const userId = req.user._id;
    MulterUpload.fields([
        { name: 'coverImage', maxCount: 1 },
        { name: 'profileImage', maxCount: 1 },
    ])(req, res, async (err) => {
        const { bio, username } = req.body;
        console.log('update profile payload', { bio, username });
        console.log('update profile images payload', req.files);
        if (err instanceof multer.MulterError) {
            switch (err.code) {
                case 'LIMIT_UNEXPECTED_FILE':
                    console.log("didn't recieve either coverImage or profileImage");
                    break;
                default:
                    break;
            }
        } else if (err) {
            return res.status(500).json({ statusCode: 500, message: 'Server Error' });
        }
        const profile = await User.findById(userId);
        if (bio) profile.bio = bio;
        if (username) profile.username = username;
        const profileImage = req.files?.profileImage && req.files?.profileImage[0];
        const coverImage = req.files?.coverImage && req.files?.coverImage[0];
        if (profileImage && profile.profileImage) {
            profile.profileImage = profileImage.filename;
        }
        if (coverImage && profile.coverImage) {
            profile.coverImage = coverImage.filename;
        }
        await profile.save();
        return res
            .status(200)
            .json(new ApiResponse(200, { user: profile }, 'successfully updated'));
    });
};
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const followUnfollowUser = async (req, res) => {
    const { userId } = req.params;
    const loggedInUserId = req.user._id;
    isValidMongooseId(userId);

    const loggedInUser = await User.findById(loggedInUserId);
    const targetUser = await User.findById(userId);

    // check if the are friends
    // which means check if the target user to which it will be followed or unfollowed is already followed
    const isTargetUserAlreadyFollowed = loggedInUser.following.find(
        (id) => id.toString() === targetUser._id.toString()
    );
    const isTargetUserBeingFollowed = targetUser.followers.find(
        (id) => id.toString() === loggedInUser._id.toString()
    );

    console.log('target user is already followed : ', isTargetUserAlreadyFollowed);
    console.log('target user is followed by the loggedIn User:', isTargetUserBeingFollowed);

    if (isTargetUserAlreadyFollowed === undefined && isTargetUserBeingFollowed === undefined) {
        // set the logic to follow the target user;
        loggedInUser.following = [...loggedInUser.following, targetUser._id];
        targetUser.followers = [...targetUser.followers, loggedInUser._id];
    } else {
        // if is is undefined then the target user is already followed so unfollow the target user
        loggedInUser.following = loggedInUser.following.filter(
            (id) => id.toString() !== targetUser._id.toString()
        );
        targetUser.followers = targetUser.followers.filter(
            (id) => id.toString() !== loggedInUser._id.toString()
        );
    }
    await loggedInUser.save();
    await targetUser.save();

    loggedInUser.password = undefined;
    res.status(200).json(
        new ApiResponse(
            200,
            { user: loggedInUser },
            `successfully ${isTargetUserAlreadyFollowed === undefined ? 'followed' : 'unfollowed'} `
        )
    );
};

const getUsers = async (req, res) => {
    console.log(req.query);
    const search = req.query.q || '';
    const userId = req.user._id;

    const result = await User.aggregate([
        { $match: { _id: { $ne: userId } } },
        { $match: { username: { $regex: search, $options: 'i' } } },
        {
            $set: {
                isFollowed: {
                    $cond: [{ $in: [userId, '$followers'] }, true, false],
                },
            },
        },
        {
            $unset: ['password'],
        },
    ]);
    res.status(200).json(new ApiResponse(200, { users: result }));
};
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getUserSuggestion = async (req, res) => {
    const userId = req.user._id;
    const users = await User.aggregate([
        {
            $match: {
                _id: { $ne: userId },
            },
        },
        {
            $match: {
                followers: { $not: { $in: [userId, '$followers'] } },
            },
        },
        {
            $set: {
                isFollowed: {
                    $cond: [{ $in: [userId, '$followers'] }, true, false],
                },
            },
        },
        { $unset: ['password', '__v'] },

        { $limit: 5 },
    ]);
    res.status(200).json(new ApiResponse(200, { users }));
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getProfileFollowersList = async (req, res) => {
    const userId = req.params.userId;
    const authUserId = req.user._id;

    isValidMongooseId(userId);

    const result = await User.aggregate([
        { $match: { _id: mongooseId(userId) } },
        {
            $lookup: {
                from: 'users',
                localField: 'followers',
                foreignField: '_id',
                as: 'followers',
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            bio: 1,
                            coverImage: 1,
                            profileImage: 1,
                            followers: 1,
                            following: 1,
                        },
                    },
                    {
                        $set: {
                            isFollowed: {
                                $cond: [{ $in: [authUserId, '$followers'] }, true, false],
                            },
                        },
                    },
                ],
            },
        },
        {
            $project: {
                followers: 1,
                _id: 0,
            },
        },
    ]);

    res.status(200).json(new ApiResponse(200, result[0], 'successfulyy fetched followers'));
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getProfileFollowingList = async (req, res) => {
    const userId = req.params.userId;
    const authUserId = req.user._id;

    isValidMongooseId(userId);

    const result = await User.aggregate([
        { $match: { _id: mongooseId(userId) } },
        {
            $lookup: {
                from: 'users',
                localField: 'following',
                foreignField: '_id',
                as: 'following',
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            bio: 1,
                            coverImage: 1,
                            profileImage: 1,
                            followers: 1,
                            following: 1,
                        },
                    },
                    {
                        $set: {
                            isFollowed: {
                                $cond: [{ $in: [authUserId, '$following'] }, true, false],
                            },
                        },
                    },
                ],
            },
        },
        {
            $project: {
                following: 1,
                _id: 0,
            },
        },
    ]);

    res.status(200).json(new ApiResponse(200, result[0], 'successfully fetched following'));
};

module.exports = {
    getMySocialProfile,
    getProfileByUserId,
    updateSocialProfile,
    followUnfollowUser,
    getUsers,
    getUserSuggestion,
    getProfileFollowersList,
    getProfileFollowingList,
};

const isValidMongooseId = (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, 'Invalid ID');
    }
};

const mongooseId = (id) => {
    return new mongoose.Types.ObjectId(id);
};
