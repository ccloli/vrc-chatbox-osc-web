const auth = (req, res, next) => {
	if (!process.env.AUTH_USER && !process.env.AUTH_PASS) {
		return next();
	}

	try {
		const authHeader = (req.headers.authorization || '').replace(/basic\s+/i, '');
		if (authHeader) {
			const [user, ...passParts] = Buffer.from(authHeader, 'base64').toString('utf-8').split(':');
			const pass = passParts.join(':');
			if (
				(process.env.AUTH_USER || '') === user &&
				(process.env.AUTH_PASS || '') === pass
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