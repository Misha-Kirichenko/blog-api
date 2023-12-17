const router = require("express").Router();
const CategoryController = require("@controllers/CategoryController");
const { verifyAuthToken, checkRole } = require('@middlewares/security');
const { createCategorySchema, updateCategorySchema } = require("@middlewares/schemas/category");
const handleValidationErrors = require("@middlewares/handleValidationErrors");

router
  .route("/")
  .get(CategoryController.getAll)
  .post([verifyAuthToken, checkRole("ADMIN"), createCategorySchema, handleValidationErrors],
    CategoryController.create);

router
  .route("/:id")
  .patch(
    [verifyAuthToken, checkRole("ADMIN"), updateCategorySchema, handleValidationErrors],
    CategoryController.update)
  .delete([verifyAuthToken, checkRole("ADMIN")],
    CategoryController.delete);

module.exports = router;
