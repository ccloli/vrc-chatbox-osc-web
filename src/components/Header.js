import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import showSnackbar from '../utils/showSnackbar';

const Header = ({ mode, onModeChange }) => {
	const button = useRef();
	const [open, setOpen] = useState(false);

	const handleClose = () => setOpen(false);
	
	const handleAction = (action) => {
		if (
			action === 'message' || action === 'copy'
		) {
			onModeChange(action);
		} else {
			showSnackbar({
				message: 'Coming soon!'
			});
		}
		handleClose();
	};

	return (
		<Box>
			<AppBar position="static">
				<Container disableGutters>
					<Toolbar>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							VRC Chatbox OSC Web
						</Typography>
						<IconButton
							id="option-button"
							ref={button}
							size="large"
							edge="start"
							color="inherit"
							aria-label="option"
							onClick={() => setOpen(true)}>
							<MoreVertIcon />
						</IconButton>
						<Menu
							anchorEl={button.current}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}>
							<MenuItem
								onClick={handleAction.bind(this, 'message')}>
								<Checkbox
									sx={{ paddingLeft: 0 }}
									checked={mode === 'message'} />
								Send to VRChat chatbox
							</MenuItem>
							<MenuItem
								onClick={handleAction.bind(this, 'copy')}>
								<Checkbox
									sx={{ paddingLeft: 0 }}
									checked={mode === 'copy'} />
								Send to system clipboard
							</MenuItem>
							<MenuItem
								onClick={handleAction.bind(this, 'config')}>
								Config
							</MenuItem>
						</Menu>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
}

export default Header;
