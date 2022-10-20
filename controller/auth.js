const { registerService, loginService } = require("../service/auth");

const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ Message: "Invalid Data" });
  }
  try {
    const user = await registerService({ name, email, password });
    return res.status(200).json({ Message: "User created." }).user;
  } catch (e) {
    next(e);
  }
};

// Login Controller
const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  // Input data check
  if (!email || !password) {
    return res.status(400).json({ Message: "Invalid Data" });
  }
  try {
    const token = await loginService({ email, password });

    return res.status(200).json({ Message: `hello your login`, token });
  } catch (e) {
    next(e);
  }
};

module.exports = { registerController, loginController };
