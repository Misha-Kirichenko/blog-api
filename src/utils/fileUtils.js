const multer = require("multer");
const path = require("path");
const fs = require('fs');

const saveFile = (directory, requiredFieldName) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const absolutePath = path.join(".", directory);
      cb(null, absolutePath)
    },
    filename: function (req, file, cb) {
      const { fieldname } = file;
      if (fieldname === requiredFieldName) {
        const extension = path.extname(file.originalname);
        const fileName = `${fieldname}-${Date.now()}${extension}`;
        const fileDest = `${directory}/${fileName}`;
        req.fileDest = fileDest;
        cb(null, fileName);
      }
    },
  });
}

const fileFilter = (type) => {
  return (req, file, cb) => {
    if (file.mimetype.startsWith(type)) {
      cb(null, true);
    } else {
      cb(new Error(`File is not an ${type}`), false);
    }
  };
}

const createFolders = (foldersArray) => {
  for (const dir of foldersArray) {
    const directory = path.join(__dirname, '..', dir);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  }
};

module.exports = { saveFile, fileFilter, createFolders };