const { registration, login, logout } = require("../services/authService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;

  const user = await registration(email, password);
  res.json({ user: { email: user.email, subscription: user.subscription } });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const { token, user } = await login(email, password);
  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await logout(_id);
  res.json({ status: "success" });
};

const currentController = async (req, res) => {
  const { _id } = req.user;
  await current(_id);
  res.json(user);
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentController,
};
