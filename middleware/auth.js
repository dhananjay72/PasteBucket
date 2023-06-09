const jwt = require("jsonwebtoken");
const user = require("../models/user");

module.exports = function (req, res, next) {
  // Get token from header

  const token = req.header("x-auth-token");
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: "No token, Authorization denied" }] });
  }

  // Verify the token
  try {
    jwt.verify(token, process.env.JWT_PASSWORD, (error, decoded) => {
      if (error) {
        console.log(error);
        return res
          .status(401)
          .json({ errors: [{ msg: "Token is not valid" }] });
      } else {
        req.user = decoded.user;
        console.log(decoded.user);
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    return res.status(500).send("Server Error");
  }
};
