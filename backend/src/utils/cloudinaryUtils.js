const cloudinary = require('../middleware/cloudinary');

const uploadToCloudinary = (filepath, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filepath, { folder: folder }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

const removeFromCloudinary = (publicId, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, { folder: folder }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

module.exports = { removeFromCloudinary, uploadToCloudinary };
