import showSnackbar from './showSnackbar';

export const request = (url, data, params = {}) => {
	return fetch(url, {
		method: 'POST',
		timeout: 10e3,
		body: JSON.stringify(data),
		...params,
		headers: {
			'content-type': 'application/json',
			...(params || {}).headers,
		},
	}).then(res => res.json()).catch((err) => {
		console.error(err);
		showSnackbar({
			message: err.message || 'Request failed, please try again later.'
		});
		throw err;
	});
};

export const chatboxInput = request.bind(this, '/api/chatbox/input');
export const chatboxTyping = request.bind(this, '/api/chatbox/typing');
export const copy = request.bind(this, '/api/copy');