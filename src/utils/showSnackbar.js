import { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

const SnackbarWrapper = (props) => {
	const [open, setOpen] = useState(true);
	const key = useRef(Math.random());
	const handleClose = (...args) => {
		setOpen(false);
		if (props.onClose) {
			props.onClose(...args);
		}
	};

	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			autoHideDuration={3000}
			TransitionComponent={Slide}
			disableWindowBlurListener
			sx={props.anchorOrigin ? {} : {
				top: 72,
			}}
			key={key}
			{...props}
			open={open}
			onClick={handleClose}
			onClose={handleClose} />
	);
};

const showSnackbar = (props) => {
	const node = document.createElement('div');
	let parent = document.getElementById('snackbar-root');
	if (!parent) {
		parent = document.createElement('div');
		parent.id = 'snackbar-root';
		document.body.appendChild(parent);
	}
	parent.appendChild(node);

	const root = ReactDOM.createRoot(node);
	const handleClose = (...args) => {
		setTimeout(() => {
			root.unmount();
			if (node.parentElement) {
				node.parentElement.removeChild(node);
			}
		}, 1e3);
		if (props.onClose) {
			props.onClose(...args);
		}
	};
	const item = (
		<SnackbarWrapper {...props} onClose={handleClose} />
	);
	root.render(item);
};

export default showSnackbar;