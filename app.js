const express = require('express');
const cors = require('cors');
const moment = require('moment');
const fs = require('fs/promises');

const app = express();

const booksRouter = require('./routes/api/books');

app.use(cors());
app.use(express.json()); // parse application/json

app.use(async (req, _, next) => {
	const { method, url } = req;
	const date = moment().format('DD-MM-YYYY_HH:mm:ss');
	await fs.appendFile('./public/server.log', `\n${method} ${url} ${date}`);
	next();
});

app.use('/api/books', booksRouter);

// const books = require('./db/books');
// app.get('/', (_, res) => {
// 	res.json(books);
// });

// const books = require('./db/books');
// app.post('/api/books', (req, res) => {
// 	console.log(req.body);
// 	res.json('test');
// });

app.use((_, res) => {
	res.status(404).json({
		message: 'Not found',
	});
});

module.exports = app;
