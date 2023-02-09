const express = require("express");

const {
  registrationController,
  loginController,
  currentController,
  logoutController,
  updateAvatarController,
  verificationController,
} = require("../../controllers/authControllers");
const {
  validateRegistration,
  validateLogin,
} = require("../../middlewares/validation");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const uploadMiddleware = require("../../middlewares/avatarsMiddleware");

const router = express.Router();

router.post(
  "/signup",
  [uploadMiddleware.single("avatar"), validateRegistration],
  asyncWrapper(registrationController)
);

router.post("/login", validateLogin, asyncWrapper(loginController));

router.get("/logout", authMiddleware, asyncWrapper(logoutController));

router.get("/current", authMiddleware, asyncWrapper(currentController));

router.patch(
  "/avatars",
  [authMiddleware, uploadMiddleware.single("avatar")],
  asyncWrapper(updateAvatarController)
);

router.get("/verify/:verificationToken", asyncWrapper(verificationController));

module.exports = router;
