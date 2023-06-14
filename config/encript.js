const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  hashPassword: (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    return hashPass;
  },
  createToken: (payload, expired = "6h") => {
    let token = jwt.sign(payload, "lexicon", {
      expiresIn: expired,
    });
  },
  readToken: (req, res, next) => {
    jwt.verify(req.token, "lexicon", (error, decript) => {
      if (error) {
        return res.status(401).send({
          success: false,
          message: "Authenticate token failed",
        });
      }
      req.decript = decript;
      next();
    });
  },
};
