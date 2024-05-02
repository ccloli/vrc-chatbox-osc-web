export const defaultConfig = {
	useOtherServer: false,
	host: '127.0.0.1',
	port: 9000,
	showInputIndicator: true,
	showInputIndicatorForClipboard: false,
	playSound: true,
	sendWithEnter: true,
	keepShowing: false,
	realtimeInput: false,
};

export const CONFIG_KEY = 'vrc-chatbox-osc-web-config';

const userAgent = navigator.userAgent;
export const IS_SAFARI = userAgent.includes('Safari') && !userAgent.includes('Chrome');
