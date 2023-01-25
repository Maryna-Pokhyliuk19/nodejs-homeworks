const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  registrationController,
  loginController,
  currentController,
  logoutController,
} = require("../../controllers/authControllers");
const {
  validateRegistration,
  validateLogin,
} = require("../../middlewares/validation");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/signup",
  validateRegistration,
  asyncWrapper(registrationController)
);

router.post("/login", validateLogin, asyncWrapper(loginController));

router.get("/logout", authMiddleware, asyncWrapper(logoutController));

router.get("/current", authMiddleware, asyncWrapper(currentController));

module.exports = router;
