const {
  getContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactByID,
  updateFavoriteById,
} = require("../services/contactsService");

const getContactsController = async (req, res) => {
  const { _id: owner } = req.user;
  let { skip = 0, limit = 5 } = req.query;
  limit = parseInt(limit) > 10 ? 10 : parseInt(limit);
  skip = parseInt(skip);

  const contacts = await getContacts(owner, { skip, limit });
  res.json({ contacts, skip, limit });
};
const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contact = await getContactById(contactId, owner);
  res.json({ contact, status: "success" });
};

const removeContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  await removeContactById(contactId, owner);
  res.json({ status: "success" });
};

const addContactController = async (req, res) => {
  const { _id: owner } = req.user;

  await addContact(req.body, owner);

  res.json({ status: "success" });
};

const updateContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req.body;
  const { _id: owner } = req.user;

  await updateContactByID(contactId, owner, body);
  res.json({ status: "success" });
};

const updateFavoriteByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id: owner } = req.user;

  await updateFavoriteById(contactId, favorite, owner);
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
