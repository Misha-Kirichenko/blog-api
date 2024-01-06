const router = require("express").Router();
const categoryRouter = require("./CategoryRouter");
const userRouter = require("./UserRouter");
const authRouter = require("./AuthRouter");
const postRouter = require("./PostRouter");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/post", postRouter);
module.exports = router;
