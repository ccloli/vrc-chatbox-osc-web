const { getConfig } = require('./config');

const auth = (req, res, next) => {
	const authUser = getConfig('AUTH_USER');
	const authPass = getConfig('AUTH_PASS');
	if (!authUser && !authPass) {
		return next();
	}

	try {
		const authHeader = (req.headers.authorization || '').replace(/basic\s+/i, '');
		if (authHeader) {
			const [user, ...passParts] = Buffer.from(authHeader, 'base64').toString('utf-8').split(':');
			const pass = passParts.join(':');
			if (
				(!authUser || String(authUser) === user) &&
				(!authPass || String(authPass) === pass)
			) {
				return next();
			}
		}
	} catch (err) {
		console.error('parse login failed', err);
	}

	res.status(401)
		.setHeader('WWW-Authenticate', 'Basic realm="Please login first"')
		.json({
			code: 401,
			message: 'authenticate failed',
			data: null,
		});
};

module.exports = auth;