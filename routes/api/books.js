const express = require('express');

const { booksControllers } = require('../../controllers');

const router = express.Router();

router.get('/', booksControllers.getAllBooks);
router.get('/:id', booksControllers.getBook);
router.post('/', booksControllers.addBook);
router.put('/:id', booksControllers.updateBook);
router.delete('/:id', booksControllers.removeBook);

module.exports = router;
