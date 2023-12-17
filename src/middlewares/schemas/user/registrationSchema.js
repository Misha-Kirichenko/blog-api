const { checkSchema } = require("express-validator");

const registrationSchema = checkSchema({
  name: {
    isString: true,
    errorMessage: 'Invalid name',
    isLength: {
      options: { min: 3 },
      errorMessage: 'name should be at least 8 chars',
    },
    matches: {
      options: /^[a-zA-Z\s]+$/,
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
      errorMessage: 'name should be at least 8 chars',
    },
    matches: {
      options: /^[a-zA-Z0-9_-]+$/,
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
      options: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      errorMessage: 'Password must contain at least one digit, one uppercase letter, one lowercase letter and one special character.',
    },
    exists: true,
  },
});

module.exports = registrationSchema;