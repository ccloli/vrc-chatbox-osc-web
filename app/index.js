const express = require('express');
const path = require('path');
const router = require('./router');
const notFound = require('./utils/notFound');
const logger = require('./utils/logger');
const showUrlHelp = require('./utils/showUrlHelp');
const auth = require('./utils/auth');
require('./utils/showSystemInfo')();

const app = express();

app.use(express.json());
app.use(logger);
app.use(auth);
app.use(express.static(path.resolve(__dirname, '../', 'build')));
app.use('/', router);
app.use('*', notFound);

const port = process.env.PORT || 38888;
app.listen(port, () => {
	console.log(`Server is now listening on port ${port}.`);
	showUrlHelp({ port });
});

app.on('error', (err) => {
	console.error(err);
});
process.on('uncaughtException', (err) => {
	console.error(err);
});