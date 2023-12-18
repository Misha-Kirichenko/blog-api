require("dotenv").config();
require("module-alias/register");
const path = require("path");
const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");
const { createFolders } = require("@utils/fileUtils");
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'assets')));

const folders = ["assets/uploads/posts", "assets/uploads/avatars"];
createFolders(folders);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((e) => console.error(e));


app.use(express.json());
app.use(routes);


app.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port ${process.env.APP_PORT}`);
});
