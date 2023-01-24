const { Contact } = require("../models/contactsModel");
const { WrongParametersError } = require("../helpers/errors");

const getContacts = async (owner, { skip, limit }) => {
  const contacts = await Contact.find({ owner })
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit);
  return contacts;
};

const getContactById = async (contactId, owner) => {
  const contact = await Contact.findById({ _id: contactId, owner }).select({
    __v: 0,
  });
  if (!contact)
    throw new WrongParametersError(`failure, no contacts with id ${id} found!`);
  return contact;
};

const removeContactById = async (contactId, owner) => {
  await Contact.findByIdAndRemove({ _id: contactId, owner }).select({ __v: 0 });
};

const addContact = async (body, owner) => {
  const contact = new Contact(...body, owner);
  await contact.save();
};

const updateContactByID = async (contactId, owner, body) => {
  await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    { $set: { body } }
  );
};

const updateFavoriteById = async (contactId, owner, favorite) => {
  await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    { $set: { favorite } }
  );
};

module.exports = {
  getContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactByID,
  updateFavoriteById,
};
