const { checkSchema } = require("express-validator");

const createCategorySchema = checkSchema({
  name: {
    isString: true,
    errorMessage: 'category name must be a string',
    isLength: {
      options: { min: 3 },
      errorMessage: 'category name should be at least 8 chars',
    },
    matches: {
      options: /^[a-zA-Z\s]+$/,
      errorMessage: 'category name can only contain latin alphabet and space',
    },
    exists: true,
  },
});

module.exports = createCategorySchema;