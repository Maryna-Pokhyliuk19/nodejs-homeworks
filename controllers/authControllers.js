const gravatar = require("gravatar");
const { copyAvatar } = require("../helpers/copyAvatar");
const fs = require("fs").promises;

const {
  registration,
  login,
  logout,
  current,
  updateAvatar,
  veryfiUser,
} = require("../services/authService");

const registrationController = async (req, res, next) => {
  // const { path } = req.file;

  req.body.avatarURL = gravatar.url(req.body.email);
  const { email, subscription } = await registration(req.body);

  try {
    await copyAvatar(req.file, req.body.avatarURL);
  } catch (error) {
    // await fs.unlink(path);
    return next(error);
  }
  res.status(201).json({ user: { email, subscription } });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await login(email, password);

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
  const user = await current(_id);
  res.json(user);
};

const updateAvatarController = async (req, res, next) => {
  const { _id } = req.user;
  const { path } = req.file;
  req.body.avatarURL = gravatar.url(req.body.email);
  await updateAvatar(_id, req.body.avatarURL);
  try {
    await copyAvatar(req.file, req.body.avatarURL);
  } catch (error) {
    await fs.unlink(path);
    return next(error);
  }
  res.json({ avatarURL: req.body.avatarURL });
};

const verificationController = async (req, res) => {
  const { verificationToken } = req.params;
  await veryfiUser(verificationToken);
  res.status(200).json({ status: "Verification successful" });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentController,
  updateAvatarController,
  verificationController,
};
