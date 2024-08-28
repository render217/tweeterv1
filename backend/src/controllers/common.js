/**
 * @param {import("express").Request} req
 * @returns {mongoose.PipelineStage[]}
 */

const postCommonAggregation = (req) => {
    const userId = req.user._id;
    return [
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author',
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            profileImage: 1,
                            following: 1,
                        },
                    },
                ],
            },
        },
        {
            $set: {
                author: { $first: '$author' },
                isLiked: {
                    $cond: {
                        if: { $in: [userId, '$likes'] },
                        then: true,
                        else: false,
                    },
                },
                isRetweeted: {
                    $cond: [{ $in: [userId, '$retweet'] }, true, false],
                },
                isBookmarked: {
                    $cond: [{ $in: [userId, '$bookmark'] }, true, false],
                },
                lastRetweeter: {
                    $arrayElemAt: ['$retweet', -1],
                },
            },
        },
        {
            $set: {
                canComment: {
                    $cond: {
                        if: {
                            $or: [
                                { $in: [userId, '$author.following'] },
                                { $eq: ['$audience', 'everyone'] },
                                { $eq: ['$author._id', userId] },
                            ],
                        },
                        then: true,
                        else: false,
                    },
                },
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'lastRetweeter',
                foreignField: '_id',
                as: 'lastRetweeter',
                pipeline: [{ $project: { _id: 1, username: 1 } }],
            },
        },
        {
            $set: {
                lastRetweeter: {
                    $cond: {
                        if: { $eq: [{ $size: '$lastRetweeter' }, 1] },
                        then: { $arrayElemAt: ['$lastRetweeter', 0] },
                        else: null,
                    },
                },
            },
        },
        {
            $unset: ['author.following'],
        },
    ];
};

module.exports = {
    postCommonAggregation,
};
