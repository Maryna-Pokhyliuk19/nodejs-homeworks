const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { NotAuthorizedError, Conflict } = require("../helpers/errors");

const registration = async (body) => {
  const { email } = body;
  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    throw new Conflict("Email in use");
  }
  const user = new User(body);
  return await user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError(`No user with email: ${email} found`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Wrong password");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );
  await User.findByIdAndUpdate(user._id, { $set: { token } });

  return { user, token };
};

const logout = async (userId) => {
  await User.findOneAndUpdate({ _id: userId }, { $set: { token: null } });
};

const current = async (userId) => {
  const { email, subscription } = await User.findOne({ _id: userId });
  return { email, subscription };
};

const updateAvatar = async (userId, avatarURL) => {
  await User.findOneAndUpdate({ _id: userId }, { $set: { avatarURL } });
};

module.exports = {
  registration,
  login,
  logout,
  current,
  updateAvatar,
};
