const {
    generateToken,
    hashPassword,
    verifyPassword,
} = require("../utils/authUtils");

const User = require("../models/user.model");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.signUpUser = async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        throw new ApiError(400, "All Fields are requried");
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
        throw new ApiError(400, "User already exists.");
    }
    const hashedPassword = hashPassword(password);
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log("newUser 🧑:", newUser);
    res.status(200).send(new ApiResponse(200, {}, "Successfully registered"));
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.signInUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "All Fields are requried");
    }
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
        throw new ApiError(400, "Invalid credential..(no-user)");
    }

    const isValidPassword = verifyPassword(password, foundUser.password);
    if (!isValidPassword) {
        throw new ApiError(403, "Invalid credentials...(incorrect-pswd)");
    }

    foundUser.password = undefined;
    foundUser.__v = undefined;

    const payload = {
        _id: foundUser._id,
        email: foundUser.email,
        username: foundUser.username,
    };

    const token = generateToken(payload);

    res.status(200).json(
        new ApiResponse(
            200,
            { user: foundUser, token },
            "successfully signed in."
        )
    );
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.loggedInUser = async (req, res) => {
    res.status(200).json(new ApiResponse(200, { user: req.user._doc }));
};
