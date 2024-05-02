import { useState, useRef, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import debounce from '../utils/debounce';
import { chatboxTyping } from '../utils/services';
import { IS_SAFARI } from '../utils/const';

const MAX_LENGTH = 144;
const TIP_SHOW_LENGTH = 130;

const InputArea = ({
	value, mode = 'message', sendWithEnter = true, sendTyping = true, onChange, onSubmit
}) => {
	const [input, setInput] = useState(value || '');
	const [loading, setLoading] = useState(false);
	const timer = useRef();
	const typing = useRef(false);
	const scrollTop = useRef(0);

	const cancelTyping = useCallback(() => {
		clearTimeout(timer.current);
		if (typing.current) {
			chatboxTyping({
				status: false,
			});
			typing.current = false;
		}
	}, []);

	const recordTyping = useCallback(debounce(() => {
		if (!sendTyping) {
			return;
		}
		if (!typing.current) {
			chatboxTyping({
				status: true
			});
		}
		typing.current = true;

		clearTimeout(timer.current);
		timer.current = setTimeout(cancelTyping, 2000);
	}, 1000), [sendTyping]);

	const handleInput = (event) => {
		const value = event.target.value;
		setInput(value);
		if (onChange) {
			onChange(value);
		}
	};

	const handleSubmit = () => {
		setLoading(true);
		const node = document.getElementById('input');
		if (node) {
			node.focus();
		}

		Promise.resolve(
			onSubmit && onSubmit(input)
		).then(() => {
			setInput('');
			onChange('');
		}).finally(() => {
			setLoading(false);
		});
		if (sendTyping) {
			cancelTyping();
		}
	};

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			if (
				sendWithEnter ? !event.shiftKey : event.ctrlKey
			) {
				event.preventDefault();
				handleSubmit();
			}
		}
	};

	const handleTouchMove = useCallback((event) => {
		const node = document.getElementById('input');
		// safari has a weird blank area when you're typing and scrolling all way up.
		// inspired from https://stackoverflow.com/a/77120903 but add another check.
		// if the target is the textarea, then maybe you're scrolling to see what you
		// typed before, so that's fine.
		// but if the page is scrolled, too, then it'll force the ime to be closed.
		if (
			event.target !== node ||
			Math.abs(document.documentElement.scrollTop - scrollTop.current) > 20
		) {
			node.blur();
		}
	}, []);

	const handleFocus = () => {
		if (IS_SAFARI) {
			document.addEventListener('touchmove', handleTouchMove);
			setTimeout(() => {
				scrollTop.current = document.documentElement.scrollTop;
			}, 1e3);
		}
	};

	const handleBlur = () => {
		if (IS_SAFARI) {
			document.removeEventListener('touchmove', handleTouchMove);
		}
		cancelTyping();
	};

	useEffect(() => {
		return cancelTyping;
	}, [cancelTyping]);

	useEffect(() => {
		return () => {
			if (IS_SAFARI) {
				document.removeEventListener('touchmove', handleTouchMove);
			}
		};
	}, [handleTouchMove]);

	useEffect(() => {
		if (value !== input) {
			setInput(value);
		}
	}, [value]);

	const label = mode === 'copy' ? 'Send To Clipboard' : 'Send Message';

	return (
		<Box flex="none" bgcolor="background.default">
			<Container>
				<Box
					display="flex"
					alignItems="flex-end"
					padding="14px 0"
					gap="10px">
					<Box flex={1} width={0}>
						<TextField
							id="input"
							value={input}
							onChange={handleInput}
							onKeyDown={handleKeyDown}
							onInput={recordTyping}
							onFocus={handleFocus}
							onBlur={handleBlur}
							label={
								mode === 'message' && input && input.length > TIP_SHOW_LENGTH
									? `${input.length}/${MAX_LENGTH}`
									: null
							}
							error={mode === 'message' && !!input && input.length > MAX_LENGTH}
							multiline
							maxRows={4}
							fullWidth
							aria-label="Input message"
							placeholder={label}
							variant="standard" />
					</Box>
					<Box flex="none">
						<IconButton
							id="send-button"
							size="small"
							color={mode === 'copy' ? 'success' : 'primary'}
							aria-label={label}
							disabled={loading}
							onClick={handleSubmit}>
							{loading ? (
								<CircularProgress size={24} />
							) : (
								mode === 'copy' ? (
									<ContentCopyIcon />
								) : (
									<SendIcon />
								)
							)}
						</IconButton>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default InputArea;