const dayjs = require('dayjs');

const logger = (req, res, next) => {
	console.log(`[${dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZZ[Z]')}] ${req.ip} - ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
	next();
};

module.exports = logger;