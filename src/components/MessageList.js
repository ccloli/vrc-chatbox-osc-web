import { useRef, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grow from '@mui/material/Grow';
import MessageItem from './MessageItem';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

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
	const isAtBottom = useRef(true);

	const handleListScroll = useCallback((event) => {
		const target = event.target;
		requestAnimationFrame(() => {
			isAtBottom.current = target.scrollTop + target.clientHeight + 30 >= target.scrollHeight;
		});
	}, []);

	useEffect(() => {
		setTimeout(() => {
			if (end.current) {
				end.current.scrollIntoView({
					behavior: 'smooth',
				});
				isAtBottom.current = true;
			}
		}, 50);
	}, [list]);

	useEffect(() => {
		const pinAtBottom = () => {
			if (scroller.current && isAtBottom.current) {
				scroller.current.scrollTop = scroller.current.scrollHeight;
			}
		};
		window.addEventListener('resize', pinAtBottom);

		return () => {
			window.removeEventListener('resize', pinAtBottom);
		};
	}, []);

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
					padding="16px 0"
					width="100%"
					overflow="auto"
					onScroll={handleListScroll}>
					<Container>
						<List
							id="message-list"
							sx={{ width: '100%', outline: 'none' }}>
							{list.map((item, index) => (
								<Grow direction="up" in key={index}>
									<ListItem
										key={item.time || index}
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
					</Container>
				</Box>
			</Box>
		</Wrapper>
	);
};

export default MessageList;