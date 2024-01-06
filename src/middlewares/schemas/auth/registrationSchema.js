const { checkSchema } = require("express-validator");
const { ALPHA_AND_SPACE, PASSWORD, NICKNAME } = require("@constants/regExps");

const registrationSchema = checkSchema({
  name: {
    isString: true,
    errorMessage: 'Invalid name',
    isLength: {
      options: { min: 3 },
      errorMessage: 'name should be at least 8 chars',
    },
    matches: {
      options: ALPHA_AND_SPACE,
      errorMessage: 'name can only contain latin alphabet and space',
    },
    exists: true,
  },
  email: {
    errorMessage: 'Invalid email',
    isEmail: true,
    exists: true,
  },
  nickName: {
    isLength: {
      options: { min: 5 },
      errorMessage: 'nickname should be at least 5 chars',
    },
    matches: {
      options: NICKNAME,
      errorMessage: 'Nickname can only contain alphabet characters, numbers, hyphens, and underscores.',
    },
    exists: true,
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password should be at least 8 chars',
    },
    matches: {
      options: PASSWORD,
      errorMessage: 'Password must contain at least one digit, one uppercase letter, one lowercase letter and one special character.',
    },
    exists: true,
  },
});

module.exports = registrationSchema;