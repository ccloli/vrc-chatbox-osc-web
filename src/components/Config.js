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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Fade from '@mui/material/Fade';

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
				<AppBar position="static">
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
				<Box flex={1}>
					<Paper sx={{ height: '100%'}}>
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
									onClick={() => handleChange('playSound', !value.playSound)}>
									<ListItemText
										primary="Play message sound"
										secondary="Play SFX when you send a message." />
									<Switch edge="end" checked={value.playSound} />
								</ListItemButton>
								<ListItemButton
									onClick={() => handleChange('sendWithEnter', !value.sendWithEnter)}>
									<ListItemText
										primary="Send message by Enter"
										secondary={
											value.sendWithEnter
												? 'Press Enter key to send. To start a new line, press Shift + Enter.'
												: 'Press Enter key to start a new line. Press Ctrl + Enter to send.'
										} />
									<Switch edge="end" checked={value.sendWithEnter} />
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