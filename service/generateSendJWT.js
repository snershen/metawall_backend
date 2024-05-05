const jwt = require("jsonwebtoken");

const generateSendJWT = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_DAY,
  });
  user.password = undefined;
  res.status(statusCode).send({
    status: "success",
    user: {
      token,
      name: user.name,
    },
  });
};

module.exports = generateSendJWT;
