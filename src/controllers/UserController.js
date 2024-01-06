const fs = require('fs').promises;
const bcrypt = require("bcrypt");
const path = require('path');
const User = require("@models/User");
const messages = require('@constants/messages');
const messageUtils = require('@utils/messageUtils');
const { ASSETS_FOLDER } = require('@constants/staticFolderNames');

exports.updateAvatar = async (req, res) => {
  if (!req.fileDest) return res.status(400).send(messageUtils.getErrormsg("Uploading avatar. No file found"));

  try {
    const staticFolderIndex = req.fileDest.indexOf("/");
    const filePath = req.fileDest.substring(staticFolderIndex + 1, req.fileDest.length);
    const updated = await User.findOneAndUpdate({ _id: req.user.id }, { avatar: filePath });

    if (updated) {
      const previousAvatar = updated.avatar ? path.join(".", "/", ASSETS_FOLDER, updated.avatar) : null;
      if (previousAvatar)
        await fs.unlink(previousAvatar);
    }
    return res.send(messageUtils.getSuccessmsg("Updating avatar"));
  }
  catch (error) {
    if (error.code === 'ENOENT' && error.syscall === "unlink") {
      return res.send(messageUtils.getSuccessmsg("Updating avatar"));
    }
    return res.status(400).send(messages.UNCATEGORIZED_ERROR);
  }
}

exports.deleteAvatar = async (req, res) => {
  try {
    const foundProfile = await User.findById(req.user.id);
    if (!foundProfile.avatar) {
      return res.status(404).send(messageUtils.getNotFoundmsg("Avatar"));
    }
    const avatarFullPath = path.join(".", "/", ASSETS_FOLDER, foundProfile.avatar)
    await fs.unlink(avatarFullPath);
    foundProfile["avatar"] = null;
    await foundProfile.save();
    return res.send(messageUtils.getSuccessmsg("Deleting avatar"));
  }
  catch (error) {
    if (error.code === 'ENOENT' && error.syscall === "unlink") {
      return res.send(messageUtils.getSuccessmsg("Deleting avatar"));
    }
    return res.status(400).send(messages.UNCATEGORIZED_ERROR);
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate({ _id: req.user.id }, req.body);
    if (updated) return res.send(messageUtils.getSuccessmsg("Updating profile"));
    return res.send(messageUtils.getNotFoundmsg("Profile"));
  }
  catch (_) {
    return res.status(400).send(messages.UNCATEGORIZED_ERROR);
  }
}

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const foundProfile = await User.findById(req.user.id);
    const passwordsMatch = await bcrypt.compare(oldPassword, foundProfile.password);

    if (passwordsMatch) {
      if (oldPassword === newPassword)
        return res.status(400).send({ msg: "Old password can't be your new password" });

      foundProfile["password"] = bcrypt.hashSync(
        newPassword,
        Number(process.env.PASSWORD_SALT)
      );

      await foundProfile.save();
      return res.send(messageUtils.getSuccessmsg("Changing password"));
    }

    return res.status(400).send({ msg: "Old password is incorrect" });
  }
  catch (_) {
    return res.status(400).send(messages.UNCATEGORIZED_ERROR);
  }

}