import { useState, useRef, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MessageItem from './MessageItem';

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
	const [scrollDownVisible, setScrollDownVisible] = useState(false);

	const handleListScroll = useCallback((event) => {
		const target = event.target;
		requestAnimationFrame(() => {
			const { scrollTop, scrollHeight, clientHeight } = target;
			isAtBottom.current = scrollTop + clientHeight + 30 >= scrollHeight;

			const visible = scrollTop + 2 * clientHeight < scrollHeight;
			if (visible !== scrollDownVisible) {
				setScrollDownVisible(visible);
			}
		});
	}, [scrollDownVisible]);

	const scrollDown = useCallback(() => {
		if (end.current) {
			end.current.scrollIntoView({
				behavior: 'smooth',
			});
		} else if (scroller.current) {
			scroller.current.scrollTop = scroller.current.scrollHeight;
		}
		isAtBottom.current = true;
	}, []);

	useEffect(() => {
		setTimeout(scrollDown, 50);
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
				<Typography color="text.secondary" sx={{ userSelect: 'none' }}>
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
				alignItems="flex-end"
				position="relative">
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
						<div id="message-list-start" />
						<List
							id="message-list"
							sx={{ width: '100%', outline: 'none' }}>
							{list.map((item, index) => (
								<Grow in key={index}>
									<ListItem
										key={item.time || index}
										disableGutters>
										<MessageItem
											text={item.text}
											time={item.time}
											type={item.type}
											keep={item.keep}
											onRefill={onRefill} />
									</ListItem>
								</Grow>
							))}
						</List>
						<Grow in={scrollDownVisible}>
							<Box position="absolute" right="24px" bottom="24px">
								<Fab
									size="medium"
									color="primary"
									aria-label="scroll to latest"
									onClick={scrollDown}>
									<KeyboardArrowDownIcon />
								</Fab>
							</Box>
						</Grow>
						<div id="message-list-end" ref={end} />
					</Container>
				</Box>
			</Box>
		</Wrapper>
	);
};

export default MessageList;