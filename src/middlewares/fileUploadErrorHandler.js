const multer = require("multer");

const fileUploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(422).json({ msg: err.message });
  } else if (err) {
    return res.status(400).json({ msg: err.message });
  }
  return next();
}

module.exports = fileUploadErrorHandler;