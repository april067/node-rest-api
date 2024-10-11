const Joi = require('joi');

const bookAdd = Joi.object({
	title: Joi.string().required(),
	author: Joi.string().required(),
});

const bookUpdate = Joi.object({
	title: Joi.string(),
	author: Joi.string(),
});

module.exports = {
	bookAdd,
	bookUpdate,
};
