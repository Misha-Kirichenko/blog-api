const router = require("express").Router();
const PostController = require("@controllers/PostController");
// const createPostMiddleWare = require("../middleware/createPost");
const verifyAuthToken = require('@middlewares/security/verifyAuthToken');

router
  .route("/")
  .post([verifyAuthToken], PostController.createPost);


module.exports = router;