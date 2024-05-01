const express = require('express');
const path = require('path');
const router = require('./router');
const notFound = require('./utils/notFound');
const errorCatch = require('./utils/errorCatch');
const logger = require('./utils/logger');

const app = express();

app.use(express.json());
app.use(logger);
app.use(express.static(path.resolve(__dirname, '../', 'build')));
app.use('/', router);
app.use('*', notFound);
app.use(errorCatch);

app.listen(38888, () => {
	console.log(`Server is now listening on port 38888`);
});

app.on('error', (err) => {
	console.error(err);
});
process.on('uncaughtException', (err) => {
	console.error(err);
});