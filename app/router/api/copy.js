const { promisify } = require('util');
const { copy } = require('copy-paste');
const { exec } = require('child_process');

module.exports = async (req, res) => {
	let { text } = Object.assign({}, req.params, req.query);
	if (text) {
		if (process.platform === 'win32') {
			// copy-paste doesn't handle utf-8 on Windows correctly,
			// and clipboardy requires to run a prebuild program.
			// since utf-8 only works on cp65001, we run a new cmd
			// and set its code page to 65001, to make it handle utf-8
			// correctly, without affecting original cmd's code page.
			await new Promise((resolve, reject) => {
				const ps = exec('cmd /c "chcp 65001 && clip"', {
					detached: true,
					windowsHide: true,
				});
				ps.stdin.write(text);
				ps.stdin.end();
				ps.on('exit', resolve);
				ps.on('error', reject);
			});
		} else {
			await promisify(copy)(text);
		}
		return res.json({
			code: 200,
			message: 'success',
			data: {
				text,
			},
		});
	}
	return res.status(400).json({
		code: 400,
		message: 'text is required',
		data: null,
	});
};