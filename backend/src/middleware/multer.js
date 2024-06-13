const multer = require('multer');
const fs = require('node:fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'images');

if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, {
        recursive: true,
    });
}
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, filePath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== 'jpeg' && ext !== '.png') {
        cb(new Error('File type is not supported'), false);
    } else {
        cb(null, true);
    }
};
module.exports = multer({
    storage: fileStorage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});
