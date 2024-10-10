const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');
const path = require('path');

const router = express.Router();

const { booksPath } = require('../../db/index');
// const booksPath = path.join(__dirname, '../../', 'db', 'books.json');
// console.log(booksPath);

const books = require('../../db/books.json');

router.get('/', (_, res) => {
	res.json(books);
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	const book = books.find((item) => item.id === id);

	if (!book) res.status(500).json({ message: 'Bad request' });

	res.json(book);
});

router.post('/', (req, res) => {
	const { title, author } = req.body;
	const book = { id: uuidv4(), title, author };
	books.push(book);

	fs.writeFile(booksPath, JSON.stringify(books, null, 2));

	res.status(201).json(book);
});

module.exports = router;
