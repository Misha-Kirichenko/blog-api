const { Category } = require("@models/Category");
const messages = require('@constants/messages');
const messageUtils = require('@utils/messageUtils');

exports.getAll = async (req, res) => {
  try {
    const allCategories = await Category.find();
    return res.send(allCategories);
  } catch (_) {
    return res.status(400).send(messages.UNCATEGORIZED_ERROR);
  }
};

exports.create = async (req, res) => {
  try {
    const category = await Category.create({ name: req.body.name });
    return res.send(category);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send(messageUtils.getDuplicateFieldMsg("Category", error.keyPattern))
    }
    return res.status(400).send(messages.UNCATEGORIZED_ERROR);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findOneAndUpdate({ _id: id }, req.body, { new: true });

    if (!updatedCategory) return res.status(404).send(messageUtils.getNotFoundmsg("category"));
    return res.send(updatedCategory);

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send(messageUtils.getDuplicateFieldMsg("Category", error.keyPattern))
    }
    return res.send(messages.UNCATEGORIZED_ERROR);
  }
};


exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await Category.findByIdAndDelete({ _id: id });
    if (!answer) return res.status(404).send(messageUtils.getNotFoundmsg("category"))
    return res.send(messageUtils.getSuccessmsg("Deleting category"))
  } catch (_) {
    return res.send(messages.UNCATEGORIZED_ERROR);
  }
};