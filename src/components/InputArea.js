import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const InputArea = ({
	value, mode = 'message', sendByEnter = true, onSubmit
}) => {
	const [input, setInput] = useState(value || '');
	const [loading, setLoading] = useState(false);

	const handleInput = (event) => {
		setInput(event.target.value);
	};

	const handleSubmit = () => {
		setLoading(true);
		Promise.resolve(
			onSubmit && onSubmit(input)
		).then(() => {
			setInput('');
		}).finally(() => {
			setLoading(false);
		})
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

	return (
		<Box
			flex="none"
			bgcolor="background.default">
			<Container>
				<Box
					display="flex"
					alignItems="flex-end"
					padding="14px"
					gap="10px">
					<Box flex={1} width={0}>
						<TextField
							value={input}
							onChange={handleInput}
							onKeyDown={handleKeyDown}
							multiline
							maxRows={4}
							fullWidth
							aria-label="Message"
							variant="standard"
							placeholder={mode === 'copy' ? 'Send To Clipboard' : 'Send Message'} />
					</Box>
					<Box flex="none">
						<IconButton
							id="send-button"
							size="small"
							color={mode === 'copy' ? 'success' : 'primary'}
							aria-label="send"
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