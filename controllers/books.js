const { booksServices } = require('../services');
const { HttpError } = require('../helpers');

const getAllBooks = async (_, res) => {
	const books = await booksServices.listBooks();
	res.json(books);
};

const getBook = async (req, res) => {
	const { id } = req.params;

	const book = await booksServices.getBookById(id);
	if (!book) {
		throw HttpError(404, 'Not found');
	}

	res.json(book);
};

const addBook = async (req, res) => {
	const data = req.body;
	const newBook = await booksServices.addBook(data);

	res.status(201).json(newBook);
};

const updateBook = async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	if (Object.keys(data).length === 0)
		res.status(400).json({ message: 'Request body must have at least one field' });

	const updatedBook = await booksServices.updateBookById(id, data);
	if (!updatedBook) {
		throw HttpError(404, 'Not found');
	}

	res.json(updatedBook);
};

const removeBook = async (req, res) => {
	const { id } = req.params;

	const book = await booksServices.removeBook(id);
	if (!book) {
		throw HttpError(404, 'Not found');
	}

	res.json(book);
};

module.exports = {
	getAllBooks,
	getBook,
	addBook,
	updateBook,
	removeBook,
};
