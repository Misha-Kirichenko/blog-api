const router = require("express").Router();
const multer = require("multer");
const UserController = require("@controllers/UserController");
const { verifyActivationToken, verifyNewPassToken, verifyAuthToken } = require("@middlewares/security");
const { registrationSchema, resetPasswordSchema } = require("@middlewares/schemas/user");
const handleValidationErrors = require("@middlewares/handleValidationErrors");
const { saveFile, fileFilter } = require("@utils/fileUtils");
const fileUploadErrorHandler = require("@middlewares/fileUploadErrorHandler");
const upload = multer({
  storage: saveFile('assets/uploads/avatars', "avatar"),
  fileFilter: fileFilter("image")
});


router.post("/login", UserController.login);
router.post("/registration", [registrationSchema, handleValidationErrors], UserController.registration);
router.patch("/activate", verifyActivationToken, UserController.activate);
router.patch("/forgotPassword", UserController.forgotPassword);
router.patch("/resetPassword",
  [
    verifyNewPassToken,
    resetPasswordSchema,
    handleValidationErrors
  ],
  UserController.resetPassword);


router.put("/updateAvatar", [verifyAuthToken, upload.single("avatar"), fileUploadErrorHandler], UserController.updateAvatar);

module.exports = router;