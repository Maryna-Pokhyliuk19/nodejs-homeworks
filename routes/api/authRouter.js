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

const router = express.Router();

router.post(
  "/signup",
  validateRegistration,
  asyncWrapper(registrationController)
);

router.post("/login", validateLogin, asyncWrapper(loginController));

router.get("/logout", asyncWrapper(logoutController));

router.get("/current", asyncWrapper(currentController));

module.exports = router;
