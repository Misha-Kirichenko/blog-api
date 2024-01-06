const { checkSchema } = require("express-validator");
const { NICKNAME } = require("@constants/regExps");

const updateProfileSchema = checkSchema({
  name: {
    custom: {
      options: (value, { req }) => {
        if (req.body && req.body.name) {
          throw new Error("You can't change your name once you registered");
        }
        return true;
      },
    },
  },
  email: {
    optional: true,
    errorMessage: 'Invalid email',
    isEmail: true,
  },
  nickName: {
    optional: true,
    isLength: {
      options: { min: 5 },
      errorMessage: 'nickname should be at least 5 chars',
    },
    matches: {
      options: NICKNAME,
      errorMessage: 'Nickname can only contain alphabet characters, numbers, hyphens, and underscores.',
    },
  }
});

module.exports = updateProfileSchema;