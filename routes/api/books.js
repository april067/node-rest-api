const express = require('express');

const { booksControllers } = require('../../controllers');
const { booksSchema } = require('../../schemas');
const { validateBody, ctrlWrapper } = require('../../helpers');

const router = express.Router();

router.get('/', booksControllers.getAllBooks);
router.get('/:id', ctrlWrapper(booksControllers.getBook));
router.post('/', validateBody(booksSchema.bookAdd), booksControllers.addBook);
router.put('/:id', validateBody(booksSchema.bookUpdate), ctrlWrapper(booksControllers.updateBook));
router.delete('/:id', ctrlWrapper(booksControllers.removeBook));

module.exports = router;
