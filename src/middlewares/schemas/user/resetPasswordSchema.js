const { checkSchema } = require("express-validator");

const resetPasswordSchema = checkSchema({
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

module.exports = resetPasswordSchema;