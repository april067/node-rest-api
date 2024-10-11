const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

const { booksPath } = require('../db');

const listBooks = async () => {
	const data = await fs.readFile(booksPath);
	return JSON.parse(data);
};

const getBookById = async (bookId) => {
	const books = await listBooks();
	const book = books.find((item) => item.id === bookId);

	return book || null;
};

const addBook = async (data) => {
	const books = await listBooks();
	const newBook = { id: uuidv4(), ...data };
	books.push(newBook);

	await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

	return newBook;
};

const updateBookById = async (bookId, data) => {
	const books = await listBooks();
	const index = books.findIndex((item) => item.id === bookId);
	if (index === -1) return null;

	books[index] = { ...books[index], ...data };

	await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

	return books[index];
};

const removeBook = async (bookId) => {
	const books = await listBooks();
	const index = books.findIndex((item) => item.id === bookId);
	if (index === -1) return null;

	const [book] = books.splice(index, 1);

	await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

	return book;
};

module.exports = {
	listBooks,
	getBookById,
	addBook,
	updateBookById,
	removeBook,
};
