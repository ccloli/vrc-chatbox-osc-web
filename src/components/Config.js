import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { defaultConfig, CONFIG_KEY } from '../utils/const';
import showSnackbar from '../utils/showSnackbar';

const Config = ({
	open = false, value = {}, onChange, onClose
}) => {
	const handleChange = (key, val) => {
		if (onChange) {
			onChange({
				...value,
				[key]: val,
			});
		}
	};

	const handleReset = () => {
		if (onChange) {
			onChange(defaultConfig);

			showSnackbar({
				message: 'Configuration is reset.',
				anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
				action: (
					<Button
						color="primary"
						size="small"
						onClick={() => {
							onChange(value);
						}}>
						Undo
					</Button>
				),
			});
		}
		localStorage.removeItem(CONFIG_KEY);
	};

	return (
		<Fade direction="left" in={open}>
			<Box
				width="100%"
				height="100%"
				zIndex={2}
				position="absolute"
				display="flex"
				flexDirection="column"
				left={0}
				top={0}>
				<AppBar position="static" sx={{ zIndex: 1 }}>
					<Container disableGutters>
						<Toolbar>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="close"
								onClick={onClose}
								sx={{ mr: 2 }}
							>
								<ArrowBackIcon />
							</IconButton>
							<Typography variant="h6" component="div" sx={{ flexFade: 1 }}>
								Config
							</Typography>
						</Toolbar>
					</Container>
				</AppBar>
				<Box flex={1} height={0}>
					<Paper sx={{ height: '100%', overflowY: 'auto' }} square>
						<Container disableGutters>
							<List sx={{ width: '100%' }}>
								<ListItemButton
									onClick={() => handleChange('showInputIndicator', !value.showInputIndicator)}>
									<ListItemText
										primary="Show input indicator"
										secondary="Let other players know you're typing." />
									<Switch edge="end" checked={value.showInputIndicator} />
								</ListItemButton>
								<ListItemButton
									onClick={() => handleChange('showInputIndicatorForClipboard', !value.showInputIndicatorForClipboard)}>
									<ListItemText
										primary="Show input indicator for clipboard"
										secondary="Although you're not chatting with others probably, you're still typing!" />
									<Switch edge="end" checked={value.showInputIndicatorForClipboard} />
								</ListItemButton>
								<ListItemButton
									onClick={() => handleChange('playSound', !value.playSound)}>
									<ListItemText
										primary="Play message sound"
										secondary="Play SFX when you send a message." />
									<Switch edge="end" checked={value.playSound} />
								</ListItemButton>
								<ListItemButton
									onClick={() => handleChange('sendWithEnter', !value.sendWithEnter)}>
									<ListItemText
										primary="Send message with Enter"
										secondary={
											value.sendWithEnter
												? 'Press Enter key to send. To start a new line, press Shift + Enter.'
												: 'Press Enter key to start a new line. Press Ctrl + Enter to send.'
										} />
									<Switch edge="end" checked={value.sendWithEnter} />
								</ListItemButton>
								<ListItemButton
									onClick={() => handleChange('keepShowing', !value.keepShowing)}>
									<ListItemText
										primary="Keep showing the last message"
										secondary="Send the last message every 4 seconds, until an empty message send." />
									<Switch edge="end" checked={value.keepShowing} />
								</ListItemButton>
								<ListItemButton
									onClick={() => handleChange('realtimeInput', !value.realtimeInput)}>
									<ListItemText
										primary="Show input on the fly"
										secondary="Send what you're typing in realtime. Technically, every 2 seconds." />
									<Switch edge="end" checked={value.realtimeInput} />
								</ListItemButton>
								<Divider />
								<ListItemButton
									onClick={handleReset}>
									<ListItemText
										primary="Reset to default"
										secondary="Reset everything you changed." />
								</ListItemButton>
							</List>
						</Container>
					</Paper>
				</Box>
			</Box>
		</Fade>
	);
};

export default Config;