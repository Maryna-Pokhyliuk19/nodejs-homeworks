const fs = require("fs").promises;
const { json } = require("express");
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("./models/contacts.json");

async function listContacts() {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  return data;
}

async function getContactById(contactId) {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  return data.find((contact) => contact.id === contactId);
}

const removeContact = async (contactId) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const result = data.filter((contact) => contact.id !== contactId);
    if (data.length === result.length) {
      return false;
    }
    await fs.writeFile(contactsPath, JSON.stringify(result), "utf8");
    return true;
  } catch (error) {
    throw new Error("Oops, something went wrong");
  }
};

const addContact = async (body) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const newContact = { id: uid(2), ...body };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
    return newContact;
  } catch (error) {
    throw new Error("Contact has not been added");
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const index = data.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return false;
    }
    data.splice(index, 1, { id: contactId, ...body });
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
    return data[index];
  } catch (error) {
    throw new Error("Internal Error");
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
