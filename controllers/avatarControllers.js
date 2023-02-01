// const Jimp = require("jimp");

// const uploadController = async (req, res, next) => {
//   const { filename } = req.file;

//   const tmpPath = path.resolve(__dirname, "../tmp", filename);
//   const newPath = path.resolve(__dirname, `../public/avatars${avatarURL}.jpg`);
//   try {
//     const avatar = await Jimp.read(tmpPath)
//       .then((img) => {
//         return img.resize(250, 250);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//     avatar.write(newPath);
//   } catch (error) {
//     console.error("error while moving file to public", error);
//   }
// };

// module.exports = {
//   uploadController,
// };
