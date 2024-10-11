const app = require('./app');

app.listen((PORT = 3000), () => {
	console.log(`Server is running on port ${PORT}`);
});
