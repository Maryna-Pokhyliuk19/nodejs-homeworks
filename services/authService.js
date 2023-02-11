const sha256 = require("sha256");
require("dotenv").config();
const { sendMail } = require("../helpers/sendMail");
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

  const verificationToken = sha256(body.email + process.env.JWT_SECRET);
  body.verificationToken = verificationToken;
  console.log(verificationToken);
  const user = new User(body);

  sendMail({
    verificationToken,
    to: email,
  });

  return await user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true });
  if (!user) {
    throw new NotAuthorizedError(`No user with email: ${email} found`);
  }

  if (!user.verify) {
    throw new NotAuthorizedError(`User email is not verify`);
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

const veryfiUser = async (verificationToken) => {
  const user = await User.findOne({ verificationToken, verify: false });

  if (!user) {
    throw new WrongParametersError(`User not found`);
  }
  user.verificationToken = "null";
  user.verify = true;
  await user.save();
};

const repeatVerify = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new WrongParametersError(`User not found`);
  }
  if (user.verify) {
    throw new NodjsError(`Verification has already been passed`);
  }

  sendMail({
    to: user.email,
    verificationToken: user.verificationToken,
  });
};

module.exports = {
  registration,
  login,
  logout,
  current,
  updateAvatar,
  veryfiUser,
  repeatVerify,
};
