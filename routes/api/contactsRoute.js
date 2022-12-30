const express = require("express");
const {
  validateAddContact,
  validateUpdateContact,
} = require("../../middlewares/validation");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json(await listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json(contact);
});

router.post("/", validateAddContact, async (req, res, next) => {
  const result = await addContact(req.body);
  res.json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await removeContact(req.params.contactId);
  if (!result) {
    res.status(400).json({ message: "No contact in list" });
  }
  res.status(200).json({ message: "Contact deleted" });
});

router.put("/:contactId", validateUpdateContact, async (req, res, next) => {
  const result = await updateContact(req.params.contactId, req.body);

  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(result);
});

module.exports = router;
