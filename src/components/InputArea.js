import { useState, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import debounce from '../utils/debounce';
import { chatboxTyping } from '../utils/services';

const MAX_LENGTH = 144;
const TIP_SHOW_LENGTH = 130;

const InputArea = ({
	value, mode = 'message', sendByEnter = true, sendTyping = true, onSubmit
}) => {
	const [input, setInput] = useState(value || '');
	const [loading, setLoading] = useState(false);
	const timer = useRef();
	const typing = useRef(false);

	const cancelTyping = useCallback(() => {
		if (!sendTyping) {
			return;
		}
		clearTimeout(timer.current);
		if (typing.current) {
			chatboxTyping({
				status: false,
			});
			typing.current = false;
		}
	}, [sendTyping]);

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
		setInput(event.target.value);
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
		}).finally(() => {
			setLoading(false);
		});
		if (sendTyping) {
			cancelTyping();
		}
	};

	const handleKeyDown = (event) => {
		if (
			sendByEnter &&
			event.keyCode === 13 &&
			!event.shiftKey
		) {
			event.preventDefault();
			handleSubmit();
		}
	};

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
							onBlur={cancelTyping}
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