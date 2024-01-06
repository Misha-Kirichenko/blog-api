const { checkSchema } = require("express-validator");
const { ALPHA_AND_SPACE } = require("@constants/regExps");

const updateCategorySchema = checkSchema({
  name: {
    optional: { options: { nullable: true } },
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
  },
  status: {
    optional: { options: { nullable: true } },
    isBoolean: {
      errorMessage: 'Status should be a boolean',
    },
  },
});

module.exports = updateCategorySchema;