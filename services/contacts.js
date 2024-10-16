const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

const { contactsPath } = require('../db');

const listContacts = async () => {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const contact = contacts.find((item) => item.id === contactId);

	return contact || null;
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) return null;

	const [contact] = contacts.splice(index, 1);

	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

	return contact;
};

const addContact = async (data) => {
	const contacts = await listContacts();
	const newContact = { id: uuidv4(), ...data };
	contacts.push(newContact);

	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

	return newContact;
};

const updateContactById = async (contactId, data) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) return null;

	contacts[index] = { ...contacts[index], ...data };

	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

	return contacts[index];
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContactById,
};
