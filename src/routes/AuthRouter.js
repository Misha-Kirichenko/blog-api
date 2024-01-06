const router = require("express").Router();
const AuthController = require("@controllers/AuthController");
const { verifyActivationToken, verifyNewPassToken } = require("@middlewares/security");
const { registrationSchema, resetPasswordSchema } = require("@middlewares/schemas/auth");
const handleValidationErrors = require("@middlewares/handleValidationErrors");

router.post("/login", AuthController.login);
router.post("/registration", [registrationSchema, handleValidationErrors], AuthController.registration);
router.patch("/activate", verifyActivationToken, AuthController.activate);
router.patch("/forgotPassword", AuthController.forgotPassword);
router.patch("/resetPassword",
  [
    verifyNewPassToken,
    resetPasswordSchema,
    handleValidationErrors
  ],
  AuthController.resetPassword);

module.exports = router;