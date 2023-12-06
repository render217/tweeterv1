const multer = require('multer');
const fs = require('node:fs');
const path = require('path');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folderExist = fs.existsSync('./src/images');
        if (!folderExist) {
            fs.mkdirSync('./src/images');
        }
        cb(null, 'src/images');
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.originalname.split('.')[0] + Date.now() + '.' + file.originalname.split('.')[1]
        );
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
