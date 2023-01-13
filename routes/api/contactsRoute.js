const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  validateAddContact,
  validateUpdateContact,
  validateUpdateFavoriteContact,
} = require("../../middlewares/validation");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactByIdController,
  updateContactByIdController,
  updateFavoriteByIdController,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", asyncWrapper(getContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.post("/", validateAddContact, asyncWrapper(addContactController));

router.delete("/:contactId", asyncWrapper(removeContactByIdController));

router.patch(
  "/:contactId/favorite",
  validateUpdateFavoriteContact,
  asyncWrapper(updateFavoriteByIdController)
);

router.put(
  "/:contactId",
  validateUpdateContact,
  asyncWrapper(updateContactByIdController)
);

module.exports = router;
