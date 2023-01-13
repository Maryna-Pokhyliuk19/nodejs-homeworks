const { Contact } = require("../models/contactsModel");
const { WrongParametersError } = require("../helpers/errors");

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  if (!contact)
    throw new WrongParametersError(
      `failure, no contacts with id '${id}'found!`
    );
  return contact;
};

const removeContactById = async (id) => {
  await Contact.findByIdAndRemove(id);
};

const addContact = async (body) => {
  const contact = new Contact(body);
  await contact.save();
};

const updateContactByID = async (id, body) => {
  await Contact.findByIdAndUpdate(id, { $set: { body } });
};

const updateFavoriteById = async (id, favorite) => {
  await Contact.findByIdAndUpdate(id, { $set: { favorite } });
};

module.exports = {
  getContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactByID,
  updateFavoriteById,
};
