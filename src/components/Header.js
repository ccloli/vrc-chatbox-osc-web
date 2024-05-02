import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Header = ({ mode, onAction }) => {
	const button = useRef();
	const [open, setOpen] = useState(false);

	const handleClose = () => setOpen(false);

	const handleAction = (action) => {
		handleClose();
		if (onAction) {
			onAction(action);
		}
	};

	return (
		<Box zIndex={1}>
			<AppBar position="static">
				<Container disableGutters>
					<Toolbar>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1, userSelect: 'none' }}>
							VRC Chatbox
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
								'aria-labelledby': 'option-button',
							}}>
							<MenuItem
								onClick={handleAction.bind(this, 'message')}>
								<Box lineHeight="38px" flex={1}>
									Send to VRChat Chatbox
								</Box>
								<Box ml="8px" mr="-2px">
									<Radio
										size="small"
										checked={mode === 'message'} />
								</Box>
							</MenuItem>
							<MenuItem
								onClick={handleAction.bind(this, 'copy')}>
								<Box lineHeight="38px" flex={1}>
									Send to system clipboard
								</Box>
								<Box ml="8px" mr="-2px">
									<Radio
										size="small"
										checked={mode === 'copy'} />
								</Box>
							</MenuItem>
							<Divider />
							<MenuItem
								onClick={handleAction.bind(this, 'config')}>
								<Box lineHeight="38px" flex={1}>
									Config
								</Box>
							</MenuItem>
						</Menu>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
}

export default Header;
