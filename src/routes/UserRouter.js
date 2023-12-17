const router = require("express").Router();
const UserController = require("@controllers/UserController");
const { verifyActivationToken, verifyNewPassToken } = require("@middlewares/security");
const { registrationSchema, resetPasswordSchema } = require("@middlewares/schemas/user");
const handleValidationErrors = require("@middlewares/handleValidationErrors");

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

module.exports = router;