import { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grow from '@mui/material/Grow';
import MessageItem from './MessageItem';
import { Typography } from '@mui/material';

const Wrapper = ({ children }) => (
	<Box
		id="message-list-wrapper"
		bgcolor="background.paper"
		flex={1}
		height={0}
		display="flex"
		alignItems="center"
		justifyContent="center">
		{children}
	</Box>
);

const MessageList = ({
	list, onRefill
}) => {
	const scroller = useRef();
	const end = useRef();

	useEffect(() => {
		setTimeout(() => {
			if (end.current) {
				end.current.scrollIntoView({
					behavior: 'smooth',
				});
			}
		}, 50);
	}, [list]);

	if (!list || !list.length) {
		return (
			<Wrapper>
				<Typography color="text.secondary">
					Nothing here yet!
				</Typography>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<Box
				width="100%"
				height="100%"
				display="flex"
				alignItems="flex-end">
				<Box
					ref={scroller}
					id="message-list-scroller"
					boxSizing="border-box"
					maxHeight="100%"
					padding="16px"
					width="100%"
					overflow="auto">
					<List
						id="message-list"
						sx={{ width: '100%' }}>
						{list.map((item, index) => (
							<Grow direction="up" in key={index}>
								<ListItem
									key={index}
									disableGutters>
									<MessageItem
										text={item.text}
										time={item.time}
										type={item.type}
										onRefill={onRefill} />
								</ListItem>
							</Grow>
						))}
					</List>
					<span id="message-list-end" ref={end}></span>
				</Box>
			</Box>
		</Wrapper>
	);
};

export default MessageList;