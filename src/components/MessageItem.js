import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ChatIcon from '@mui/icons-material/Chat';
import ReplayIcon from '@mui/icons-material/Replay';
import dayjs from 'dayjs';
import { MAX_LENGTH } from '../utils/const';

const MessageItem  = ({
	text, time, type = 'message', keep = false, onRefill
}) => {
	return (
		<Box width="100%">
			<Avatar
				sx={{
					bgcolor: type === 'copy' ? 'warning.main' : 'info.main',
					zIndex: 1,
				}}
				alt={type}>
				{type === 'copy' ? (
					<ContentPasteIcon />
				) : (
					<ChatIcon />
				)}
			</Avatar>
			<Card
				sx={{
					position: 'relative',
					marginLeft: '20px',
					marginTop: '-20px',
					padding: '2px'
				}}>
				<CardContent>
					<Typography
						variant="body1"
						color="text.primary"
						whiteSpace="pre-wrap"
						sx={{
							wordBreak: 'break-word',
						}}>
						{text.substr(0, MAX_LENGTH)}
						<Typography
							variant="body"
							sx={{
								opacity: 0.5,
							}}>
							{text.substr(MAX_LENGTH)}
						</Typography>
					</Typography>
				</CardContent>
				<CardActions
					sx={{
						display: 'flex',
						padding: '8px 16px',
					}}>
					<Typography
						flex={1}
						variant="caption"
						sx={{ userSelect: 'none' }}
						color="text.secondary"
						fontSize="small">
						{dayjs(time).format('YYYY-MM-DD HH:mm:ss')}
						{keep && (
							<CircularProgress
								disableShrink
								sx={{
									color: 'inherit',
									marginLeft: '12px',
									verticalAlign: 'baseline'
								}}
								size={12} />
						)}
					</Typography>
					{onRefill && (
						<IconButton
							size="small"
							color="text.secondary"
							sx={{
								padding: 0,
								marginLeft: 'auto',
							}}
							aria-label="Resend message"
							onClick={() => onRefill(text)}>
							<ReplayIcon fontSize="1em" />
						</IconButton>
					)}
				</CardActions>
			</Card>
		</Box>
	);
};

export default MessageItem;