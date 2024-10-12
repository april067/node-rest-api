const Joi = require('joi');

const contactAdd = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
});

const contactUpdate = Joi.object({
	name: Joi.string(),
	email: Joi.string(),
	phone: Joi.string(),
});

module.exports = {
	contactAdd,
	contactUpdate,
};
