const messages = require("@constants/messages");

const checkRole = (requiredRole) => (
  (req, res, next) => {
    const { role } = req.user;
    if (role !== requiredRole) return res.status(403).send(messages.ACCESS_DENIED);
    return next();
  }
);

module.exports = checkRole;