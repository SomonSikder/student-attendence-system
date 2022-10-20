const jwt = require("jsonwebtoken");
const User = require("../models/UserModle");

const authenticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ Message: "Unauthorized" });
    }

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, "secret-key");
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ Message: "Unauthorized" });
    }
    /* 
    req is mutable object. To will pass User info to others routes 
    needs to add user proparty in req object so that we get 
    Authorized User from other rotues
    */
    req.user = user;
    next();
  } catch (e) {
    return res.status(404).json({ Message: "Invalied Token" });
  }
};

module.exports = authenticate;
