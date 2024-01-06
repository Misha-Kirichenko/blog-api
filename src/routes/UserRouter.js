const router = require("express").Router();
const multer = require("multer");
const UserController = require("@controllers/UserController");
const { verifyAuthToken } = require("@middlewares/security");
const { saveFile, fileFilter } = require("@utils/fileUtils");
const fileUploadErrorHandler = require("@middlewares/fileUploadErrorHandler");
const { changePasswordSchema, updateProfileSchema } = require("@middlewares/schemas/user");
const handleValidationErrors = require("@middlewares/handleValidationErrors");
const upload = multer({
  storage: saveFile('assets/uploads/avatars', "avatar"),
  fileFilter: fileFilter("image")
});

router.put("/updateAvatar", [verifyAuthToken, upload.single("avatar"), fileUploadErrorHandler], UserController.updateAvatar);
router.delete("/deleteAvatar", [verifyAuthToken], UserController.deleteAvatar);
router.patch("/changePassword",
  [
    verifyAuthToken,
    changePasswordSchema,
    handleValidationErrors
  ],
  UserController.changePassword
);

router.patch("/updateProfile",
  [
    verifyAuthToken,
    updateProfileSchema,
    handleValidationErrors
  ],
  UserController.updateProfile
);

module.exports = router;