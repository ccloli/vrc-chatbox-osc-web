const debounce = (fn, time) => {
	let pre = 0;
	return (...args) => {
		const t = Date.now();
		if (t - pre >= time) {
			pre = t;
			return fn(...args);
		}
	};
};

export default debounce;