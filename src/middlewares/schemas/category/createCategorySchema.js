const { checkSchema } = require("express-validator");
const { ALPHA_AND_SPACE } = require("@constants/regExps");

const createCategorySchema = checkSchema({
  name: {
    isString: true,
    errorMessage: 'category name must be a string',
    isLength: {
      options: { min: 3 },
      errorMessage: 'category name should be at least 8 chars',
    },
    matches: {
      options: ALPHA_AND_SPACE,
      errorMessage: 'category name can only contain latin alphabet and space',
    },
    exists: true,
  },
});

module.exports = createCategorySchema;