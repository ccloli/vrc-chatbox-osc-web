const express = require('express');
const path = require('path');
const router = require('./router');

const app = express();

app.use(express.static(path.resolve(__dirname, '../', 'build')));
app.use('/', router);
app.use('*', (req, res, next) => {
	res.status(404).json({
		message: 'not found',
		data: null,
		code: 404,
	});
});
app.use((err, req, res, next) =>  {
	console.error(err);
	res.status(err.status || 500).json({
		message: err.message || 'internal server error',
		data: err,
		code: 500,
	});  
});

app.listen(38888, () => {
	console.log(`Server is now listening on port 38888`);
});

app.on('error', (err) => {
	console.error(err);
});
process.on('uncaughtException', (err) => {
	console.error(err);
});