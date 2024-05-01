import { useState, useRef } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Header from './components/Header';
import MessageList from './components/MessageList';
import InputArea from './components/InputArea';
import { chatboxInput, copy } from './utils/services';
import { defaultConfig } from './utils/const';
import Config from './components/Config';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#0e1621',
      default: '#17212b',
    }
  },
});

function App() {
  const [list, setList] = useState([]);
  const [mode, setMode] = useState('message');
  const [config, setConfig] = useState(defaultConfig);
  const [open, setOpen] = useState(false);
  const interval = useRef();

  const handleSend = async (text) => {
    clearInterval(interval.current);
    if (mode === 'copy') {
      await copy({ text });
    } else {
      await chatboxInput({
        text, sfx: config.playSound && !!text
      });
    }

    if (text) {
      setList([
        ...list,
        {
          text, time: new Date(), type: mode,
        }
      ]);

      if (config.keepShowing) {
        interval.current = setInterval(() => {
          chatboxInput({
            text, sfx: false
          });
        }, 4000);
      }
    }
  };

	const handleAction = (action) => {
    if (
      action === 'message' || action === 'copy'
    ) {
      setMode(action);
      return;
    }
    if (action === 'config') {
      setOpen(true);
      return;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        flexGrow={1}
        height="100%"
        flexDirection="column"
        display="flex">
        <Header
          mode={mode}
          onAction={handleAction} />
        <MessageList list={list} />
        <InputArea
          mode={mode}
          sendTyping={config.showInputIndicator}
          sendWithEnter={config.sendWithEnter}
          onSubmit={handleSend} />
        <Config
          open={open}
          value={config}
          onChange={setConfig}
          onClose={() => setOpen(false)} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
