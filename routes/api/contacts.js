const express = require('express');

const { contactsControllers } = require('../../controllers');
const { contactsSchema } = require('../../schemas');
const { validateBody, ctrlWrapper } = require('../../helpers');

const router = express.Router();

router.get('/', contactsControllers.getAllContacts);
router.get('/:id', ctrlWrapper(contactsControllers.getContact));
router.post('/', validateBody(contactsSchema.contactAdd), contactsControllers.addContact);
router.put(
	'/:id',
	validateBody(contactsSchema.contactUpdate),
	ctrlWrapper(contactsControllers.updateContact)
);
router.delete('/:id', ctrlWrapper(contactsControllers.removeContact));

module.exports = router;
