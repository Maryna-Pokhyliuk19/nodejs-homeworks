const {
  getContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactByID,
  updateFavoriteById,
} = require("../services/contactsService");

const getContactsController = async (req, res) => {
  const contacts = await getContacts();
  res.json({ contacts });
};
const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  res.json({ contact, status: "success" });
};

const removeContactByIdController = async (req, res) => {
  const { id } = req.params;
  await removeContactById(id);
  res.json({ status: "success" });
};

const addContactController = async (req, res) => {
  await addContact(req.body);

  res.json({ status: "success" });
};

const updateContactByIdController = async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;

  await updateContactByID(id, body);
  res.json({ status: "success" });
};

const updateFavoriteByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  await updateFavoriteById(contactId, favorite);
  res.json({ status: "success" });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  removeContactByIdController,
  addContactController,
  updateContactByIdController,
  updateFavoriteByIdController,
};
