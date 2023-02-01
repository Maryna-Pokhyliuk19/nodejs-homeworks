const Jimp = require("jimp");
const fs = require("fs").promises;

const resizeAvatar = async (path) => {
  const avatar = await Jimp.read(path);
  await avatar.resize(250, 250);
  await avatar.write(path);
};

const copyAvatar = async ({ originalname, path }, avatarURL) => {
  const [, extension] = originalname.split(".");
  const avatarName = avatarURL.split("/");
  const newFile = `${avatarName[avatarName.length - 1]}.${extension}`;
  await resizeAvatar(path);

  await fs.rename(path, `./public/avatars/${newFile}`);
};

module.exports = { copyAvatar };
